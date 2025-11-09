import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
  iconPath?: string;
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
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
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
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
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
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

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, url, iconPath = '/favicon.ico' }) => {
  useEffect(() => {
    document.title = title;

    const setOrUpdateMeta = (attributes: { [key: string]: string }) => {
      const selector = Object.entries(attributes)
        .map(([k, v]) => `[${k}="${v}"]`)
        .join('');
      let meta = document.querySelector(`meta${selector}`) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        Object.entries(attributes).forEach(([k, v]) => meta.setAttribute(k, v));
        document.head.appendChild(meta);
      } else {
        Object.entries(attributes).forEach(([k, v]) => meta.setAttribute(k, v));
      }
    };

    const setOrUpdateLink = (rel: string, href: string, type?: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
      if (type) link.setAttribute('type', type);
    };

    const setOrUpdateScript = (type: string, content: string) => {
      let script = document.querySelector(`script[type="${type}"]`) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', type);
        document.head.appendChild(script);
      }
      script.textContent = content;
    };

    document.querySelectorAll('meta[name], meta[property], link[rel], script[type="application/ld+json"]').forEach(el => el.remove());

    setOrUpdateMeta({ charset: 'UTF-8' });
    setOrUpdateMeta({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    setOrUpdateMeta({ name: 'description', content: description });
    setOrUpdateMeta({ name: 'keywords', content: 'косметология, биоревитализация, аугментация губ, чистка лица, массаж лица, липолитики, ботулинотерапия, коллаген, Шлиссельбург, косметолог' });
    setOrUpdateMeta({ name: 'robots', content: 'index, follow' });
    setOrUpdateMeta({ name: 'author', content: 'Эстерия' });
    setOrUpdateMeta({ name: 'theme-color', content: '#122720' });

    setOrUpdateMeta({ property: 'og:title', content: title });
    setOrUpdateMeta({ property: 'og:description', content: description });
    setOrUpdateMeta({ property: 'og:type', content: 'website' });
    setOrUpdateMeta({ property: 'og:site_name', content: 'Esteria' });
    setOrUpdateMeta({ property: 'og:locale', content: 'ru_RU' });
    setOrUpdateMeta({ property: 'og:image', content: '/assets/interior/interior-2.jpg' }); // Исправлено: абсолютный путь
    setOrUpdateMeta({ property: 'og:image:width', content: '1200' });
    setOrUpdateMeta({ property: 'og:image:height', content: '630' });

    setOrUpdateMeta({ name: 'geo.region', content: 'RU-LEN' });
    setOrUpdateMeta({ name: 'geo.placename', content: 'Шлиссельбург' });
    setOrUpdateMeta({ name: 'geo.position', content: '59.9458;31.0115' });
    setOrUpdateMeta({ name: 'ICBM', content: '59.9458, 31.0115' });

    setOrUpdateLink('canonical', url);
    setOrUpdateLink('icon', iconPath, 'image/x-icon');

    setOrUpdateScript('application/ld+json', JSON.stringify(structuredData));

    return () => { };
  }, [title, description, url, iconPath]);

  return null;
};

export default SEOHead;
