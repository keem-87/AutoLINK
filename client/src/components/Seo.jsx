import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

/**
 * SEO component for injecting meta tags into the document head.
 * Provides sensible defaults and supports Open Graph and Twitter metadata.
 */
function Seo({ title, description, url = '', image = '' }) {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {title && <meta property="og:title" content={title} />}
        {description && <meta property="og:description" content={description} />}
        <meta property="og:type" content="website" />
        {url && <meta property="og:url" content={url} />}
        {image && <meta property="og:image" content={image} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    </HelmetProvider>
  );
}

export default Seo;
