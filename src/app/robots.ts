import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/business-login/'],
      },
    ],
    sitemap: 'https://www.smic360.com/sitemap.xml',
    host: 'https://www.smic360.com',
  };
}
