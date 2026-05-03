import { MetadataRoute } from 'next';

const BASE = 'https://www.smic360.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                                  lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/sdgs`,                          lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/about`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/solutions`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/the-phoenix-enclave`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/christies-homestay`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/portfolio`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`,                     lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE}/blog`,                        lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/faq`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/privacy`,                     lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,                       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/solutions/marketing/branding-works`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/solutions/marketing/corporate-branding`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/solutions/marketing/digital-marketing`,  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/solutions/marketing/media-buying`,       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/solutions/marketing/print-management`,   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/solutions/marketing/website-development`,lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
