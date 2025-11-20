import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Эстерия",
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
    "@type": "GGeoCoordinates",
    "latitude": 59.9458,
    "longitude": 31.0115
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-965-788-7750",
    "contactType": "Customer Service",
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
    "ratingValue": "5",
    "reviewCount": "2000"
  }
};

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, url }) => {
  useEffect(() => {

    document.title = title;

    const setMetaTag = (name: string, content: string, property?: string) => {
      let element = document.querySelector(`meta[${property ? `property="${property}"` : `name="${name}"`}]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href: string, type?: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
      if (type) element.setAttribute('type', type);
    };

    const setScriptTag = (type: string, content: string) => {
      let element = document.querySelector(`script[type="${type}"]`) as HTMLScriptElement;
      if (!element) {
        element = document.createElement('script');
        element.setAttribute('type', type);
        document.head.appendChild(element);
      }
      element.textContent = content;
    };

    // Добавляем мета-теги
    setMetaTag('charset', 'UTF-8');
    setMetaTag('viewport', 'width=device-width, initial-scale=1');
    setMetaTag('description', description);
    setMetaTag('keywords', 'косметология, биоревитализация, аугментация губ, чистка лица, массаж лица, липолитики, ботулинотерапия, коллаген, Шлиссельбург, косметолог');
    setMetaTag('robots', 'index, follow');
    setMetaTag('author', 'Эстерия');
    setMetaTag('theme-color', '#122720');

    // Open Graph мета-теги
    setMetaTag('og:title', title, 'og:title');
    setMetaTag('og:description', description, 'og:description');
    setMetaTag('og:type', 'website', 'og:type');
    setMetaTag('og:site_name', 'Esteria', 'og:site_name');
    setMetaTag('og:locale', 'ru_RU', 'og:locale');
    setMetaTag('og:image', '../assets/interior/interior-2.jpg', 'og:image');
    setMetaTag('og:image:width', '1200', 'og:image:width');
    setMetaTag('og:image:height', '630', 'og:image:height');


    setMetaTag('geo.region', 'RU-LEN');
    setMetaTag('geo.placename', 'Шлиссельбург');
    setMetaTag('geo.position', '59.9458;31.0115');
    setMetaTag('ICBM', '59.9458, 31.0115');


    setLinkTag('canonical', url);
    setLinkTag('icon', '/logo.png', 'image/x-icon');


    setScriptTag('application/ld+json', JSON.stringify(structuredData));


    return () => {

    };
  }, [title, description, url]);

  return null;
};

export default SEOHead;
