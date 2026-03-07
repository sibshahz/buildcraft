'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BadgeCheck } from 'lucide-react'

export const AboutSection = () => {
  return (
    <section className="py-32 bg-secondary text-white relative overflow-hidden">
      {/* Background Decorative Text */}
      <h2 className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 text-[10vw] font-black text-white/5 whitespace-nowrap leading-none hidden md:block">
        BUILD CRAFT
      </h2>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs block mb-6">
            Our Brand Narrative
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight font-outfit">
            A Legacy of Excellence <br />
            <span className="text-primary font-light italic">Across the UAE.</span>
          </h2>
          <p className="text-brand-offwhite/60 text-lg leading-relaxed mb-8 max-w-xl">
            Licensed under Ajman Free Zone, BuildCraft Flooring & Décor has grown into a trusted
            leader in the flooring industry. We specialize in supplying and installing high-quality
            carpets, tiles, and LVT solutions that define architectural elegance.
          </p>
          <div className="flex flex-col space-y-6 mb-12">
            {[
              'Specialized Hospitality & Office Flooring',
              'Premium Mosque & Residential Carpets',
              'Expert Installation Across all Emirates',
              'High-Quality SPC & LVT Flooring',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <BadgeCheck className="w-6 h-6 text-primary" />
                <span className="font-semibold text-brand-offwhite/80">{feature}</span>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            className="group flex items-center text-primary font-bold uppercase tracking-widest text-xs border-b border-primary/20 pb-2 hover:border-primary transition-all duration-300"
          >
            Read Our Full Story
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative flex justify-center w-full"
        >
          <div className="w-full h-[600px] md:h-[700px] bg-secondary border border-white/5 relative group p-4 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-primary/10 transition-opacity duration-700 opacity-20 group-hover:opacity-0 z-10" />
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 shadow-2xl" />
          </div>

          {/* MD Section - Moved outside overflow-hidden but stays inside motion.div parent */}
          <div className="absolute bottom-12 -left-3 lg:-left-20 bg-brand-offwhite p-10 md:p-14 max-w-xs shadow-2xl text-secondary z-20">
            <span className="text-primary font-bold uppercase tracking-widest text-[10px] block mb-4">
              Leadership
            </span>
            <h4 className="text-2xl font-bold font-outfit mb-2 italic">Noshaba Muhammad</h4>
            <p className="text-xs text-secondary/60 uppercase tracking-widest font-bold">
              Managing Director
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
