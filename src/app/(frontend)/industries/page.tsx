'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CTASection } from '@/components/sections/CTASection'
import {
  ArrowRight,
  Building,
  Home,
  Hotel,
  Building2,
  Briefcase,
  GraduationCap,
} from 'lucide-react'
import Link from 'next/link'

const industries = [
  {
    title: 'Hotels & Hospitality',
    description:
      'Luxurious flooring solutions for guest rooms, lobbies, corridors, and banquet halls.',
    icon: Hotel,
    image:
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2070&auto=format&fit=crop',
    href: '/industries/hospitality',
  },
  {
    title: 'Offices & Corporate Spaces',
    description: 'Durable and professional carpet tiles and LVT for modern workplaces.',
    icon: Briefcase,
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    href: '/industries/corporate',
  },
  {
    title: 'Villas & Residential Projects',
    description: 'Elegant and comfortable wall-to-wall carpets and premium LVT for luxury homes.',
    icon: Home,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    href: '/industries/residential',
  },
  {
    title: 'Mosques & Prayer Facilities',
    description: 'Specialized spiritual space carpets designed for high comfort and longevity.',
    icon: Building2,
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
    href: '/industries/religious',
  },
  {
    title: 'Commercial & Retail Fit Outs',
    description: 'High-performance flooring for showrooms, retail stores, and commercial projects.',
    icon: Building,
    image:
      'https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2000&auto=format&fit=crop',
    href: '/industries/retail',
  },
  {
    title: 'Institutional Projects',
    description:
      'Reliable and safe flooring solutions for schools, hospitals, and public institutions.',
    icon: GraduationCap,
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop',
    href: '/industries/institutional',
  },
]

export default function IndustriesPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative py-24 md:py-32 bg-secondary flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-fixed bg-center" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Sectors Served
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-outfit">
              Tailored Flooring <br />
              <span className="text-primary font-light italic text-2xl md:text-5xl">
                by Industry Expertise.
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid Section */}
      <section className="py-24 md:py-32 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <Link
                href={industry.href}
                className="group flex flex-col h-full bg-white shadow-sm border border-secondary/5 hover:border-primary transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply transition-colors group-hover:bg-primary/10" />
                </div>

                <div className="p-8 md:p-10 flex flex-col flex-grow relative">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-8 transition-colors group-hover:bg-primary">
                    <industry.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-4 font-outfit tracking-tight group-hover:text-primary transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-secondary/60 text-sm leading-relaxed mb-10 font-light flex-grow">
                    {industry.description}
                  </p>
                  <div className="flex items-center text-primary text-xs font-bold uppercase tracking-widest border-b border-primary/20 self-start pb-2 group-hover:border-primary transition-all duration-300">
                    Explore Industry Solutions
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
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
            From the high-traffic corridors of Dubai's luxury hotels to the serene atmosphere of
            regional mosques, our flooring solutions are engineered for specific performance and
            aesthetic requirements.
          </p>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
