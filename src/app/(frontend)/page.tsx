import React from 'react'
import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { AboutSection } from '@/components/sections/AboutSection'
import { CTASection } from '@/components/sections/CTASection'

export default async function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Services Grid Section */}
      <ServicesGrid />

      {/* About Section */}
      <AboutSection />

      {/* Industry Showcase / Stats Section (Optional but good) */}
      <section className="py-24 bg-brand-offwhite border-y border-gray-100 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 w-full text-center">
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-bold text-secondary mb-2 font-outfit">
              UAE
            </span>
            <span className="text-[10px] uppercase font-bold text-primary tracking-[0.4em] mb-4">
              Coverage
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-bold text-secondary mb-2 font-outfit">
              100+
            </span>
            <span className="text-[10px] uppercase font-bold text-primary tracking-[0.4em] mb-4">
              Projects Done
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-bold text-secondary mb-2 font-outfit">
              Premium
            </span>
            <span className="text-[10px] uppercase font-bold text-primary tracking-[0.4em] mb-4">
              Carpets & LVT
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-bold text-secondary mb-2 font-outfit">
              10+
            </span>
            <span className="text-[10px] uppercase font-bold text-primary tracking-[0.4em] mb-4">
              Services
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
