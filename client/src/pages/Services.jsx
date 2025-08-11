import React from 'react';
import Navbar from '../Navbar';
import Footer from '../components/Footerjs';
import Section from '../components/Section';

/**
 * Services page detailing the various pet care offerings provided by The Shelter‑Stead.
 */
function Services() {
  return (
    <>
      <Navbar />
      <main>
        <Section>
          <h1 className="text-3xl font-bold mb-4">Services</h1>
          <p className="mb-4">The Shelter‑Stead offers a range of premium pet care services including boarding, daycare, house sitting, and personalized training programs.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Boarding</h2>
          <p>Comfortable overnight care for your dog or cat in our home.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Daycare</h2>
          <p>Daily play sessions with socialization and enrichment.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">House Sitting</h2>
          <p>In‑home care that keeps your pets comfortable and secure.</p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Training</h2>
          <p>Positive reinforcement programs tailored to your pet’s needs.</p>
        </Section>
      </main>
      <Footer />
    </>
  );
}

export default Services;
