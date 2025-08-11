import React from 'react';
import Navbar from '../Navbar';
import Footer from '../components/Footerjs';
import Section from '../components/Section';

/**
 * Gallery page placeholder. Encourages future additions of images showcasing happy
 * guests and facilities.
 */
function Gallery() {
  return (
    <>
      <Navbar />
      <main>
        <Section>
          <h1 className="text-3xl font-bold mb-4">Gallery</h1>
          <p>Check back soon for photos of our happy guests!</p>
        </Section>
      </main>
      <Footer />
    </>
  );
}

export default Gallery;
