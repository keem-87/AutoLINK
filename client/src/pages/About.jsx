import React from 'react';
import Navbar from '../Navbar';
import Footer from '../components/Footerjs';
import Section from '../components/Section';

/**
 * About page describing the mission and background of The Shelter‑Stead.
 */
function About() {
  return (
    <>
      <Navbar />
      <main>
        <Section>
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p>The Shelter‑Stead is a family‑owned pet care business based in Middletown, Delaware. Our mission is to provide a safe and nurturing environment for pets while their owners are away. With years of experience in positive reinforcement training, boarding, and daycare, we treat every pet like part of our family.</p>
        </Section>
      </main>
      <Footer />
    </>
  );
}

export default About;
