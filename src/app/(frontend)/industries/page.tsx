import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CTASection } from '@/components/sections/CTASection'
import { IndustryCard } from './IndustryCard'

export default async function IndustriesPage() {
  const payload = await getPayload({ config: configPromise })

  const industries = await payload.find({
    collection: 'industries',
    limit: 100,
  })

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative py-24 md:py-32 bg-secondary flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-fixed bg-center" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
          <div>
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Sectors Served
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-outfit">
              Tailored Flooring <br />
              <span className="text-primary font-light italic text-2xl md:text-5xl">
                by Industry Expertise.
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Industries Grid Section */}
      <section className="py-24 md:py-32 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {industries.docs.map((industry, index) => (
            <IndustryCard key={industry.id} industry={industry} index={index} />
          ))}
        </div>
      </section>

      {/* Capability Statement */}
      <section className="py-24 bg-secondary text-white border-y border-white/5 flex flex-col items-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-10">
            Cross-Sector Excellence
          </h2>
          <p className="text-brand-offwhite/60 text-lg leading-relaxed mb-0 font-light max-w-2xl mx-auto">
            From the high-traffic corridors of Dubai&apos;s luxury hotels to the serene atmosphere
            of regional mosques, our flooring solutions are engineered for specific performance and
            aesthetic requirements.
          </p>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
