import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://turizm.ge'; // Replace with your actual domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example of a disallow rule
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}