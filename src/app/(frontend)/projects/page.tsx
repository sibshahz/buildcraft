import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CTASection } from '@/components/sections/CTASection'
import { ProjectGrid } from './ProjectGrid'

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise })

  const projectsResult = await payload.find({
    collection: 'projects',
    limit: 100,
    depth: 1, // To get industry details
  })

  const industriesResult = await payload.find({
    collection: 'industries',
    limit: 100,
  })

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative py-32 md:py-48 bg-onyx flex items-center overflow-hidden min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-onyx/40 via-onyx/80 to-onyx z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center scale-105" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
          <div>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
                Our Legacy
              </span>
              <div className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] text-sand mb-10 tracking-tight">
              Masterpieces in Every <br />
              <span className="text-gold font-light italic drop-shadow-2xl">
                Square Centimeter.
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Portfolio Filter Section */}
      <section className="py-24 bg-brand-offwhite">
        <ProjectGrid
          projects={projectsResult.docs as any}
          industries={industriesResult.docs as any}
        />
      </section>

      <CTASection />
    </div>
  )
}
