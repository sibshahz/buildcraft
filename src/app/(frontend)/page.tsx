import React from 'react'
import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { AboutSection } from '@/components/sections/AboutSection'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
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

      {/* Industries Showcase Section */}
      <IndustriesSection />

      {/* Royal States / Stats Section */}
      <section className="py-24 md:py-40 bg-sand relative overflow-hidden">
        {/* Subtle separator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-emerald/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 w-full">
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl md:text-7xl font-serif text-emerald mb-4">07</span>
            <span className="text-[10px] uppercase font-bold text-gold tracking-[0.4em]">
              Emirates Covered
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl md:text-7xl font-serif text-emerald mb-4">100+</span>
            <span className="text-[10px] uppercase font-bold text-gold tracking-[0.4em]">
              Prestigious Projects
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl md:text-7xl font-serif text-emerald mb-4">Premium</span>
            <span className="text-[10px] uppercase font-bold text-gold tracking-[0.4em]">
              Material Grading
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-5xl md:text-7xl font-serif text-emerald mb-4">Ajman</span>
            <span className="text-[10px] uppercase font-bold text-gold tracking-[0.4em]">
              Based Heritage
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
