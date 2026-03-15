import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CTASection } from '@/components/sections/CTASection'
import { IndustriesList } from './IndustriesList'

export default async function IndustriesPage() {
  const payload = await getPayload({ config: configPromise })

  const industries = await payload.find({
    collection: 'industries',
    limit: 100,
  })

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative py-32 md:py-48 bg-onyx flex items-center overflow-hidden min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-onyx/40 via-onyx/80 to-onyx z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-fixed bg-center scale-105" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
          <div>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
                Sectors Served
              </span>
              <div className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] text-sand mb-10 tracking-tight">
              Tailored Flooring <br />
              <span className="text-gold font-light italic drop-shadow-2xl">
                by Industry Expertise.
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Industries Grid Section */}
      <section className="py-24 md:py-32 bg-brand-offwhite">
        <IndustriesList industries={industries.docs} />
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
