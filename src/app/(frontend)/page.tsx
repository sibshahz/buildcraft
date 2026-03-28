import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { BlockRenderer } from '@/components/blocks'
import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { AboutSection } from '@/components/sections/AboutSection'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { CTASection } from '@/components/sections/CTASection'
import { JsonLd } from '@/components/common/JsonLd'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
  })

  const page: any = result.docs[0]

  if (!page) {
    return {}
  }

  const { meta } = page

  return {
    title: meta?.title || page.title,
    description: meta?.description || '',
    openGraph: {
      title: meta?.title || page.title,
      description: meta?.description || '',
      images: meta?.image
        ? [
            {
              url: meta.image.url || '/og-image.png',
            },
          ]
        : [
            {
              url: '/og-image.png',
            },
          ],
    },
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [result, siteSettings] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      limit: 1,
      overrideAccess: false,
    }),
    payload.findGlobal({
      slug: 'site-settings',
    }),
  ])

  const page = result.docs[0]

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BuildCraft Flooring & Décor',
    url: 'https://buildcraftflooring.ae',
    alternateName: ['BuildCraft', 'BuildCraft Flooring'],
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'BuildCraft Flooring & Décor',
    image: (siteSettings.logo as any)?.url || 'https://buildcraftflooring.ae/og-image.png',
    '@id': 'https://buildcraftflooring.ae',
    url: 'https://buildcraftflooring.ae',
    telephone: siteSettings.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteSettings.address,
      addressLocality: 'Ajman',
      addressRegion: 'Ajman',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.4052',
      longitude: '55.5136',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    sameAs: siteSettings.socialLinks?.map((l: any) => l.url) || [],
  }

  return (
    <div className="flex flex-col">
      <JsonLd data={webSiteJsonLd} />
      <JsonLd data={jsonLd} />
      {page ? (
        <BlockRenderer blocks={page.layout} />
      ) : (
        <>
          {/* Hero Section */}
          <Hero />

          {/* Services Grid Section */}
          <ServicesGrid />

          {/* About Section */}
          <AboutSection />

          {/* Industries Showcase Section */}
          <IndustriesSection />

          {/* Royal States / Stats Section */}
          <section className="py-24 md:py-40 bg-sand relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-onyx/10 to-transparent" />
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 w-full">
              <div className="flex flex-col items-center text-center">
                <span className="text- Onyx text-5xl md:text-7xl font-serif mb-4">07</span>
                <span className="text-[10px] uppercase font-bold text-gold tracking-[0.4em]">
                  Emirates Covered
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text- Onyx text-5xl md:text-7xl font-serif mb-4">100+</span>
                <span className="text-[10px] uppercase font-bold text-gold tracking-[0.4em]">
                  Prestigious Projects
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text- Onyx text-5xl md:text-7xl font-serif mb-4">Premium</span>
                <span className="text-[10px] uppercase font-bold text-gold tracking-[0.4em]">
                  Material Grading
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text- Onyx text-5xl md:text-7xl font-serif mb-4">Ajman</span>
                <span className="text-[10px] uppercase font-bold text-gold tracking-[0.4em]">
                  Based Heritage
                </span>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <CTASection />
        </>
      )}
    </div>
  )
}
