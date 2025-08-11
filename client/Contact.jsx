import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../components/Footerjs';
import Section from '../components/Section';

/**
 * Contact page with a simple form. The form does not send data anywhere yet, but
 * demonstrates how to collect user input and provide feedback.
 */
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you could call your backend API to send the message
  };

  return (
    <>
      <Navbar />
      <main>
        <Section>
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          {submitted ? (
            <p>Thank you for reaching out. We'll get back to you soon.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label>Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>
              <div className="mb-4">
                <label>Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>
              <div className="mb-4">
                <label>Message</label>
                <br />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }}
                />
              </div>
              <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}>Send</button>
            </form>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
