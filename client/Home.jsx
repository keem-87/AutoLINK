import React from 'react';
import Navbar from '../Navbar';
import Footer from '../components/Footerjs';
import Section from '../components/Section';

/**
 * Landing page for The Shelter‑Stead. Presents a hero section and highlights
 * key services with concise descriptions. Uses inline styles for the call‑to‑action
 * button to avoid dependency on Tailwind or other CSS frameworks.
 */
function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to The Shelter‑Stead</h1>
          <p className="mb-6">Premium pet care, training, and boarding services.</p>
          <a
            href="/booking"
            style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: '#007BFF', color: '#fff', borderRadius: '4px', textDecoration: 'none' }}
          >
            Book Now
          </a>
        </Section>
        <Section>
          <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
          <ul>
            <li><strong>Boarding:</strong> Comfortable overnight care for your dog or cat.</li>
            <li><strong>Daycare:</strong> Daily play and socialization sessions.</li>
            <li><strong>Training:</strong> Personalized positive‑reinforcement programs.</li>
            <li><strong>House Sitting:</strong> Peace of mind with in‑home pet care.</li>
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
