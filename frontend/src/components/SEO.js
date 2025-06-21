// components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, url }) => {
  return (
    <Helmet>
      <title>{title} | Kaashi Jewels</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title + ' | Kaashi Jewels'} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:title" content={title + ' | Kaashi Jewels'} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
