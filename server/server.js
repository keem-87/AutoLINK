require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const jwt = require('jsonwebtoken');
const Stripe = require('stripe');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const sanitizeHtml = require('sanitize-html');
/*
 * Shelter‑Stead XaaS backend
 *
 * This Express application exposes a handful of routes that power the core
 * functionality of the Shelter‑Stead service.  Features include:
 *   • Customer registration and authentication using hashed passwords.
 *   • Optional two‑factor authentication with TOTP codes (powered by
 *     speakeasy).  After a successful password login, a second code is
 *     generated and must be verified.  The example logs the code to the
 *     console but in production you should send it via SMS or email.
 *   • Token based sessions using JSON Web Tokens (JWTs).
 *   • An example payment intent route using the Stripe API.  This route
 *     returns a client secret that can be consumed by the frontend to
 *     complete payment for bookings.
 *   • MongoDB persistence via mongoose.  See .env.example for connection
 *     string and other secrets.
 */

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet()); // sets secure HTTP headers
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // rate limiter
app.use(mongoSanitize()); // prevents Mongo injection
// Input sanitization example
function sanitizeInput(req, res, next) {
  Object.keys(req.body).forEach(key => {
    req.body[key] = sanitizeHtml(req.body[key]);
  });
  next();
}
app.use(express.json(), sanitizeInput);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
// Initialise Stripe with your secret key (see .env.example for details)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shelterstead', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  twoFactorSecret: { type: String },
  twoFactorEnabled: { type: Boolean, default: false },
});
const User = mongoose.model('User', userSchema);

// Helper: generate JWT from a user id
function generateJwt(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'sheltersteadsecret', {
    expiresIn: '24h',
  });
}

/**
 * Register a new user.  Accepts name, email and password in the request body.
 * A hashed password is stored in MongoDB.  The client is expected to
 * implement their own user interface for this route.
 */
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash });
    await user.save();
    return res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

/**
 * Handle user login.  After checking the password, this route will either
 * generate a JWT (when two‑factor is disabled) or return a 2FA challenge.
 * The code is logged to the console for demonstration purposes.
 */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    if (user.twoFactorEnabled) {
      // generate a 2FA code using the stored secret
      const token = speakeasy.totp({
        secret: user.twoFactorSecret,
        encoding: 'base32',
      });
      // TODO: send token via email/SMS using your provider of choice
      console.log('2FA code for', user.email, token);
      return res.json({ twoFactorRequired: true, userId: user._id });
    }

    // no 2FA, issue JWT
    const authToken = generateJwt(user._id);
    res.json({ token: authToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login error', error: err.message });
  }
});

/**
 * Verify a 2FA token.  The client should send userId and the one‑time code.
 */
app.post('/api/verify-2fa', async (req, res) => {
  try {
    const { userId, code } = req.body;
    const user = await User.findById(userId);
    if (!user || !user.twoFactorEnabled) {
      return res.status(400).json({ message: 'Invalid 2FA verification' });
    }
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: code,
      window: 1,
    });
    if (!verified) return res.status(401).json({ message: 'Invalid 2FA code' });
    const authToken = generateJwt(user._id);
    res.json({ token: authToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '2FA verification error', error: err.message });
  }
});

/**
 * Create a payment intent.  The client should send the amount (in cents) and
 * currency.  The returned clientSecret is used to complete the payment on
 * the frontend using Stripe.js.
 */
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({ amount, currency });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment intent error', error: err.message });
  }
});

// Simple authenticated route example.  Use bearer token in Authorization header.
app.get('/api/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sheltersteadsecret');
    const user = await User.findById(decoded.userId).select('-passwordHash -twoFactorSecret');
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Shelter‑Stead API listening on port ${PORT}`);
});
