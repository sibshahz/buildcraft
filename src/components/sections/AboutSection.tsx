'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useSiteSettings } from '@/providers/SiteSettingsContext'

export const AboutSection = () => {
  const { address, mdName } = useSiteSettings()
  return (
    <section className="py-24 md:py-48 bg-pearl relative overflow-hidden">
      {/* Decorative Heritage Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-10 h-[1px] bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
              The BuildCraft Legacy
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-serif text-onyx leading-[1.1] mb-12">
            Regional Expertise. <br />
            <span className="italic font-light">Global Quality.</span>
          </h2>

          <div className="space-y-8 text-onyx/70 text-lg md:text-xl font-light leading-relaxed mb-12 font-outfit">
            <p>
              Licensed under the **{address}**, BuildCraft Flooring & Décor stands as a testament to
              Emirati reliability and architectural excellence. We represent the pinnacle of
              flooring solutions across the seven emirates.
            </p>
            <p>
              From the high-traffic corridors of **luxury UAE hotels** to the serene environments of
              local **mosques and private royal villas**, our commitment to premium installation
              quality remains unparalleled.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-16">
            <div className="flex flex-col">
              <span className="text-gold font-bold text-4xl font-serif mb-2">07</span>
              <span className="text-[10px] uppercase tracking-widest text-onyx/40 font-bold">
                Emirates Served
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gold font-bold text-4xl font-serif mb-2">100+</span>
              <span className="text-[10px] uppercase tracking-widest text-onyx/40 font-bold">
                Elite Projects
              </span>
            </div>
          </div>

          <Link
            href="/about"
            className="group flex items-center text-onyx font-bold uppercase tracking-[0.3em] text-[10px] border-b border-gold/40 pb-3 hover:border-gold transition-all duration-300 self-start"
          >
            Explore Our Story
            <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Main Image Frame */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-onyx p-6 shadow-2xl">
            <div className="absolute inset-0 z-10 bg-onyx/10 opacity-40 group-hover:opacity-0 transition-opacity" />
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
              alt="Luxury Emirati Villa Interior"
              fill
              className="object-cover transition-transform duration-2000 hover:scale-105"
            />
          </div>

          {/* Leadership Signature Card */}
          <div className="absolute -bottom-12 -left-3 md:-left-12 bg-white p-10 md:p-14 max-w-xs shadow-[0_30px_60px_-15px_rgba(8,8,8,0.2)]">
            <span className="text-gold font-bold uppercase tracking-widest text-[9px] block mb-4">
              Direction
            </span>
            <h4 className="text-2xl font-serif text-onyx italic mb-2 tracking-tight">{mdName}</h4>
            <p className="text-[10px] text-onyx/40 uppercase tracking-[0.3em] font-bold">
              Managing Director
            </p>

            {/* Subtle Gold Divider */}
            <div className="mt-8 w-12 h-[2px] bg-gold" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
