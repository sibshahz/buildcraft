'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, Mail } from 'lucide-react'

export const CTASection = () => {
  return (
    <section className="py-24 md:py-48 bg-background relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-onyx z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-onyx p-10 md:p-24 shadow-2xl overflow-hidden relative"
        >
          {/* Decorative Pattern Background */}
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-20 relative z-10">
            <div className="max-w-xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-[1px] bg-background" />
                <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
                  Your Vision, Our Craft
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif text-background mb-12 leading-tight">
                Begin Your <br />
                <span className="italic font-light text-gold italic">Architectural Journey.</span>
              </h2>

              <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-10">
                <Link
                  href="/contact"
                  className="group relative bg-background text-onyx px-12 py-6 w-full sm:w-auto text-center font-bold uppercase tracking-[0.3em] text-[11px] transition-all duration-500 overflow-hidden shadow-lg hover:scale-105"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-[45deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10 flex items-center justify-center">
                    Request a Quote
                    <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </span>
                </Link>
                <div className="flex items-center space-x-4 text-background/40 font-bold tracking-widest text-[9px] uppercase">
                  <span>OR REACH US DIRECTLY</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white/5 border border-white/10 p-10 backdrop-blur-md group hover:bg-background transition-all duration-500 cursor-pointer">
                <div className="flex items-center space-x-8">
                  <div className="w-16 h-16 bg-gold/10 group-hover:bg-onyx flex items-center justify-center transition-colors">
                    <Phone className="w-6 h-6 text-gold group-hover:text-background" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-background/40 group-hover:text-onyx/40 tracking-[0.3em] mb-2">
                      Concierge Call
                    </span>
                    <span className="text-2xl font-serif text-background group-hover:text-onyx transition-colors">
                      +971 56 496 1186
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 backdrop-blur-md group hover:bg-background transition-all duration-500 cursor-pointer">
                <div className="flex items-center space-x-8">
                  <div className="w-16 h-16 bg-gold/10 group-hover:bg-onyx flex items-center justify-center transition-colors">
                    <Mail className="w-6 h-6 text-gold group-hover:text-background" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-background/40 group-hover:text-onyx/40 tracking-[0.3em] mb-2">
                      Electronic Liaison
                    </span>
                    <span className="text-xl font-serif text-background group-hover:text-onyx transition-colors break-all">
                      sales@buildcraftflooring.ae
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
