import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://buildcraftflooring.com'

  // Fetch all collections
  const [pages, services, projects, industries] = await Promise.all([
    payload.find({ collection: 'pages', limit: 1000 }),
    payload.find({ collection: 'services', limit: 1000 }),
    payload.find({ collection: 'projects', limit: 1000 }),
    payload.find({ collection: 'industries', limit: 1000 }),
  ])

  const pageLinks = pages.docs.map((page) => ({
    url: `${baseUrl}/${page.slug === 'home' ? '' : page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: page.slug === 'home' ? 1.0 : 0.8,
  }))

  const serviceLinks = services.docs.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const projectLinks = projects.docs.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const industryLinks = industries.docs.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date(industry.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const staticLinks = [
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  return [...pageLinks, ...serviceLinks, ...projectLinks, ...industryLinks, ...staticLinks]
}
