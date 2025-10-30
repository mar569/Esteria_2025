
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Esteria",
  "description": "Косметологический кабинет в Шлиссельбурге. Биоревитализация, аугментация губ, чистка лица, массаж лица, липолитики по телу и лицу, ботулинотерапия, коллаген и другие процедуры.",
  "url": "https://esteriacosmo.ru",
  "telephone": "+7-965-788-7750",
  "email": "marianna.esteria@mail.ru",
  "priceRange": "700-15000 рублей",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Чекалова, 10",
    "addressLocality": "Шлиссельбург",
    "postalCode": "187320",
    "addressCountry": "RU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 59.9458,
    "longitude": 31.0115
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-965-788-7750",
    "contactType": "customer service",
    "availableLanguage": ["Russian"],
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    }
  },
  "sameAs": [

    "https://vk.com/esterum_cosmo"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday"],
      "opens": "10:00",
      "closes": "18:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2000"
  }
};

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, url }) => (
  <Helmet>
    <title>{title}</title>

    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <meta
      name="keywords"
      content="косметология, биоревитализация, аугментация губ, чистка лица, массаж лица, липолитики, ботулинотерапия, коллаген, Шлиссельбург, косметолог"
    />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Esteria" />
    <meta name="theme-color" content="#10b981" />
    <link rel="canonical" href={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Esteria" />
    <meta property="og:locale" content="ru_RU" />
    <meta
      property="og:image"
      content="../assets/interior/interior-1.jpg"
    />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />


    <meta name="geo.region" content="RU-LEN" />
    <meta name="geo.placename" content="Шлиссельбург" />
    <meta name="geo.position" content="59.9458;31.0115" />
    <meta name="ICBM" content="59.9458, 31.0115" />


    <link rel="icon" href="/logo.png" type="image/x-icon" />


    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  </Helmet>
);

export default SEOHead;
