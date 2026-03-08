'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Building2, Hotel, Home, Landmark, ShoppingBag, GraduationCap } from 'lucide-react'

const industries = [
  {
    title: 'Hotels & Hospitality',
    description:
      'Transforming world-class hotel environments with high-traffic luxury carpeting and flooring.',
    icon: Hotel,
    image:
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Corporate Offices',
    description:
      'Bespoke modular flooring designed for productivity and prestigious corporate identity.',
    icon: Building2,
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
  },
  {
    title: 'Villas & Residential',
    description:
      'Tailored luxury for private Emirati villas, combining comfort with elite architectural design.',
    icon: Home,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Mosques & Prayer',
    description:
      'Durable and spiritually inspired carpeting for sacred community and prayer facilities.',
    icon: Landmark,
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Commercial Retail',
    description:
      'High-durability SPC and LVT solutions for luxury brand outlets and retail fit-outs.',
    icon: ShoppingBag,
    image:
      'https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Institutional Projects',
    description:
      'Safe, sustainable, and professional-grade flooring for regional public and educational institutions.',
    icon: GraduationCap,
    image:
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop',
  },
]

export const IndustriesSection = () => {
  return (
    <section className="py-24 md:py-48 bg-royal text-sand overflow-hidden relative">
      {/* Decorative Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col mb-24 max-w-3xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-10 h-[1px] bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
              Strategic Partners
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-sand leading-tight">
            Industries <br />
            <span className="italic font-light text-gold">We Elevate.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-default"
            >
              <div className="relative h-[400px] w-full mb-8 overflow-hidden bg-white/5 border border-white/10 p-2">
                {/* Main Image Overlay */}
                <div className="absolute inset-0 z-10 bg-royal/60 opacity-100 group-hover:opacity-0 transition-opacity duration-700" />

                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />

                {/* Large Icon Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group-hover:opacity-0 transition-opacity duration-500 flex flex-col items-center">
                  <industry.icon className="w-16 h-16 text-gold mb-6 stroke-[1px]" />
                  <span className="text-sand font-serif text-2xl tracking-wide">
                    {industry.title}
                  </span>
                </div>

                {/* Hover Content */}
                <div className="absolute inset-0 z-30 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 flex flex-col items-center justify-center p-12 text-center">
                  <industry.icon className="w-12 h-12 text-royal mb-8" />
                  <h4 className="text-2xl font-serif text-royal mb-6">{industry.title}</h4>
                  <p className="text-royal/70 text-sm leading-relaxed font-light">
                    {industry.description}
                  </p>
                  <div className="mt-8 w-12 h-[1px] bg-royal/20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
