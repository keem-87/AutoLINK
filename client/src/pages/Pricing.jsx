import React from 'react';
import Navbar from '../Navbar';
import Footer from '../components/Footerjs';
import Section from '../components/Section';

/**
 * Pricing page summarizing the cost of each service offered by The Shelter‑Stead.
 */
function Pricing() {
  return (
    <>
      <Navbar />
      <main>
        <Section>
          <h1 className="text-3xl font-bold mb-4">Pricing</h1>
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px' }}>Service</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px' }}>Dog Boarding (per night)</td>
                <td style={{ padding: '8px' }}>$48</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>Additional Dog</td>
                <td style={{ padding: '8px' }}>$24</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>Cat Boarding (per night)</td>
                <td style={{ padding: '8px' }}>$25</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>Dog Daycare (per day)</td>
                <td style={{ padding: '8px' }}>$33</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>Training Session (45 mins)</td>
                <td style={{ padding: '8px' }}>$60</td>
              </tr>
            </tbody>
          </table>
        </Section>
      </main>
      <Footer />
    </>
  );
}

export default Pricing;
