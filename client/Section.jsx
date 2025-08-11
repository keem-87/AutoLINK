import React from 'react';

/**
 * A simple wrapper component that constrains content to a centered column
 * and applies consistent spacing. You can pass additional CSS classes
 * via the `className` prop to customize the layout on a per‑use basis.
 */
function Section({ children, className }) {
  return (
    <section className={`max-w-4xl mx-auto px-4 py-10 ${className || ''}`}>
      {children}
    </section>
  );
}

export default Section;
