import type { MetadataRoute } from 'next';
import { urlSitio } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const url = urlSitio();

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
