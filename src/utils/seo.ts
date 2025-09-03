// SEO utilities and structured data
export interface BusinessInfo {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  website: string;
  openingHours: string[];
  services: string[];
  priceRange: string;
}

export const businessInfo: BusinessInfo = {
  name: 'Beauty Clinic',
  description: 'Премиальная косметологическая клиника в Санкт-Петербурге, специализирующаяся на биовитализации, аугментации губ, чистках лица и других косметологических процедурах.',
  address: {
    street: 'Невский проспект, 100',
    city: 'Санкт-Петербург',
    postalCode: '191025',
    country: 'RU'
  },
  phone: '+78123456789',
  email: 'info@beautyclinic.ru',
  website: 'https://beautyclinic.ru',
  openingHours: [
    'Mo-Su 09:00-20:00'
  ],
  services: [
    'Биовитализация',
    'Аугментация губ',
    'Чистка лица',
    'Массаж лица',
    'RF-лифтинг',
    'Пилинги'
  ],
  priceRange: '$$'
};

export const generateStructuredData = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: businessInfo.name,
    description: businessInfo.description,
    url: businessInfo.website,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    priceRange: businessInfo.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.country
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
        'Friday', 'Saturday', 'Sunday'
      ],
      opens: '09:00',
      closes: '20:00'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Косметологические услуги',
      itemListElement: businessInfo.services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service
        }
      }))
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2000'
    }
  };

  return JSON.stringify(structuredData, null, 2);
};

export const generateSitemap = () => {
  const baseUrl = 'https://beautyclinic.ru';
  const pages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '#services', priority: '0.9', changefreq: 'monthly' },
    { url: '#about', priority: '0.8', changefreq: 'monthly' },
    { url: '#appointment', priority: '0.9', changefreq: 'weekly' },
    { url: '#reviews', priority: '0.7', changefreq: 'weekly' },
    { url: '#blog', priority: '0.8', changefreq: 'weekly' },
    { url: '#contact', priority: '0.8', changefreq: 'monthly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};