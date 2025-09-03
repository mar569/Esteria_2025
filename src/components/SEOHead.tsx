import React from 'react';
import { generateStructuredData } from '../utils/seo';

const SEOHead = () => {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredData()
        }}
      />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Beauty Clinic" />
      <meta name="theme-color" content="#10b981" />
      
      {/* Open Graph */}
      <meta property="og:site_name" content="Beauty Clinic" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:image" content="https://images.pexels.com/photos/3985263/pexels-photo-3985263.jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Beauty Clinic - Косметологическая клиника в СПб" />
      <meta name="twitter:description" content="Профессиональные косметологические процедуры в центре Санкт-Петербурга. Запись онлайн." />
      <meta name="twitter:image" content="https://images.pexels.com/photos/3985263/pexels-photo-3985263.jpeg" />
      
      {/* Local Business */}
      <meta name="geo.region" content="RU-SPE" />
      <meta name="geo.placename" content="Санкт-Петербург" />
      <meta name="geo.position" content="59.9311;30.3141" />
      <meta name="ICBM" content="59.9311, 30.3141" />
    </>
  );
};

export default SEOHead;