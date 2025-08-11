import React from 'react';
import Navbar from '../Navbar';
import Footer from '../components/Footerjs';
import Section from '../components/Section';

/**
 * Frequently Asked Questions page. Provides answers to common customer inquiries.
 */
function Faq() {
  return (
    <>
      <Navbar />
      <main>
        <Section>
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <h2 className="text-2xl font-semibold mt-6 mb-2">What services do you offer?</h2>
          <p>We offer boarding, daycare, house sitting, and training programs.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">How do I book?</h2>
          <p>You can request a booking through our Booking page or via Rover.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">What are your rates?</h2>
          <p>Please see our Pricing page for detailed rate information.</p>
        </Section>
      </main>
      <Footer />
    </>
  );
}

export default Faq;
