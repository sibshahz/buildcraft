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
      <section className="relative py-24 md:py-32 bg-secondary flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
          <div>
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Our Legacy
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-outfit">
              Masterpieces in Every <br />
              <span className="text-primary font-light italic text-2xl md:text-5xl">
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
