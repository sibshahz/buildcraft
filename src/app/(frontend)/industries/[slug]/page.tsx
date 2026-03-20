import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Media } from '@/payload-types'
import { RichText } from '@/components/common/RichText'
import { JsonLd } from '@/components/common/JsonLd'
import { ArrowRight, ShieldCheck, MapPin } from 'lucide-react'
import Link from 'next/link'
import { CTASection } from '@/components/sections/CTASection'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const [{ slug }, payload] = await Promise.all([
    props.params,
    getPayload({ config }),
  ])

  const { docs } = await payload.find({
    collection: 'industries',
    where: {
      slug: {
        equals: slug,
      },
    },
    overrideAccess: false,
  })

  const industry: any = docs[0]

  if (!industry) {
    return {}
  }

  const { meta } = industry

  return {
    title: meta?.title || `${industry.title} Flooring Solutions | BuildCraft`,
    description: meta?.description || industry.description || '',
    openGraph: {
      title: meta?.title || industry.title,
      description: meta?.description || industry.description || '',
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
    alternates: {
      canonical: `/industries/${slug}`,
    },
  }
}

export default async function IndustryPage(props: PageProps) {
  const [{ slug }, payload] = await Promise.all([
    props.params,
    getPayload({ config }),
  ])

  const { docs } = await payload.find({
    collection: 'industries',
    where: {
      slug: {
        equals: slug,
      },
    },
    overrideAccess: false,
  })

  const industry = docs[0]

  if (!industry) {
    return notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: industry.title,
    description: industry.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'BuildCraft Flooring & Décor',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ajman',
        addressCountry: 'AE',
      },
    },
    areaServed: 'United Arab Emirates',
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://buildcraftflooring.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Industries',
        item: 'https://buildcraftflooring.com/industries',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: industry.title,
        item: `https://buildcraftflooring.com/industries/${slug}`,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-pearl">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbLd} />

      {/* Hero Header */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={(industry.bannerImage as Media)?.url || ''}
          alt={industry.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-onyx/40 backdrop-blur-[1px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs bg-white/10 backdrop-blur-md px-6 py-2 border border-gold/30">
              Sector Specialization
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-white leading-tight mb-8">
            {industry.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            {industry.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2">
            <div className="prose prose-xl prose-onyx max-w-none mb-20">
              {industry.longDescription ? (
                <RichText content={industry.longDescription} />
              ) : (
                <p className="text-onyx/80 leading-relaxed font-light">
                  BuildCraft specializes in high-performance flooring solutions tailored to the unique demands 
                  of the {industry.title} sector in the UAE. Our master craftsmen ensure precision 
                  installation with premium materials built for longevity and aesthetic excellence.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-brand-offwhite border border-secondary/5 rounded-sm">
                    <ShieldCheck className="w-8 h-8 text-gold mb-6" />
                    <h4 className="text-xl font-serif mb-4">Quality Standards</h4>
                    <p className="text-onyx/60 text-sm font-light leading-relaxed">
                        Every project in the {industry.title} sector adheres to our internal &quot;Royal Grade&quot; 
                        standards, ensuring the materials and installation meet the highest hospitality or commercial criteria.
                    </p>
                </div>
                <div className="p-8 bg-brand-offwhite border border-secondary/5 rounded-sm">
                    <MapPin className="w-8 h-8 text-gold mb-6" />
                    <h4 className="text-xl font-serif mb-4">Regional Expertise</h4>
                    <p className="text-onyx/60 text-sm font-light leading-relaxed">
                        Based in Ajman and serving all 7 Emirates, we understand the climate and environmental factors 
                        that impact flooring performance in the Gulf.
                    </p>
                </div>
            </div>
          </div>

          <div className="lg:col-span-1">
             <div className="sticky top-32 p-10 bg-onyx text-white rounded-sm">
                <h3 className="text-3xl font-serif mb-6 relative z-10">Sector Expertise</h3>
                <p className="text-white/70 mb-8 relative z-10 font-light">
                  Tailored consultation for {industry.title} projects across the UAE.
                </p>
                <Link 
                    href="/contact" 
                    className="flex items-center justify-between w-full bg-gold py-5 px-8 text-onyx font-bold uppercase tracking-widest text-xs hover:bg-gold/90 transition-all rounded-sm"
                  >
                    Request Consultation
                    <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
