import { MetadataRoute } from 'next'
import { ROUTES_DATA } from './data/routes';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://turizm.ge';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/routes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/forum`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = ROUTES_DATA.map((route) => ({
    url: `${baseUrl}/routes/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}