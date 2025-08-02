import React, { useState } from 'react';
import axios from 'axios';

// Register component handles user registration.
// It collects name, email, and password information and
// sends a POST request to the backend /api/register endpoint.
// On success, it notifies the user; on error, it displays the error message.
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    success: ''
  });

  // Update form state when inputs change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit registration data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client‑side validation: ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      setFormData((prev) => ({ ...prev, error: 'Passwords do not match', success: '' }));
      return;
    }
    try {
      // Call the backend endpoint. Adjust the URL if your server uses a different path or proxy.
      const res = await axios.post('/api/register', {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });
      // If registration succeeds, show a success message
      setFormData((prev) => ({ ...prev, success: 'Registration successful! Please log in.', error: '', name: '', email: '', password: '', confirmPassword: '' }));
    } catch (err) {
      // Surface error messages returned by the server, otherwise show generic failure
      const message = err.response?.data?.error || 'Registration failed';
      setFormData((prev) => ({ ...prev, error: message, success: '' }));
    }
  };

  const { name, email, password, confirmPassword, error, success } = formData;

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
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
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Register</button>
      </form>
    </div>
  );
}

export default Register;
