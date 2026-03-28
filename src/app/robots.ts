import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://buildcraftflooring.ae'

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/favicon.ico'],
      disallow: ['/admin', '/api'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
