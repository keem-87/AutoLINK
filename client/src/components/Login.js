import React, { useState } from 'react';
import axios from 'axios';

// Login component handles user authentication.
// It sends login credentials to the backend and conditionally handles two‑factor authentication (2FA).
// Upon successful login, you should store the JWT token securely (ideally as an HTTP‑only cookie set by the server).
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    token: '', // used for 2FA verification
    needTwoFactor: false,
    error: '',
    success: ''
  });

  // Handle form field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit login credentials
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', {
        email: formData.email,
        password: formData.password,
      });
      // If 2FA is required, the backend should respond with a flag
      if (res.data.twoFactorRequired) {
        setFormData((prev) => ({ ...prev, needTwoFactor: true, error: '', success: '' }));
        return;
      }
      // Otherwise, login is successful; token may be returned in res.data.token
      setFormData((prev) => ({ ...prev, success: 'Logged in successfully!', error: '' }));
      // TODO: store res.data.token securely (e.g. HTTP‑only cookie via backend or secure localStorage strategy)
    } catch (err) {
      const message = err.response?.data?.error || 'Login failed';
      setFormData((prev) => ({ ...prev, error: message, success: '' }));
    }
  };

  // Verify the 2FA token
  const handleVerifyToken = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login/2fa', {
        email: formData.email,
        token: formData.token,
      });
      setFormData((prev) => ({ ...prev, success: 'Two‑factor authentication successful!', error: '', needTwoFactor: false }));
      // You may receive a JWT here (res.data.token) to store securely
    } catch (err) {
      const message = err.response?.data?.error || '2FA verification failed';
      setFormData((prev) => ({ ...prev, error: message, success: '' }));
    }
  };

  const { email, password, token, needTwoFactor, error, success } = formData;

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {!needTwoFactor ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              required
              minLength={6}
              style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>Login</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyToken}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="token">2FA Code:</label>
            <input
              id="token"
              name="token"
              type="text"
              value={token}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>Verify</button>
        </form>
      )}
    </div>
  );
}

export default Login;
