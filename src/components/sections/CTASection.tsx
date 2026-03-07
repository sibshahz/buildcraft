'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, Mail } from 'lucide-react'

export const CTASection = () => {
  return (
    <section className="py-32 bg-brand-offwhite relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-secondary z-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary p-12 md:p-24 shadow-2xl overflow-hidden relative group"
        >
          {/* Decorative Pattern Background */}
          <div className="absolute inset-0 bg-white/5 opacity-5 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-16 relative z-10">
            <div>
              <span className="text-secondary font-bold uppercase tracking-[0.4em] text-xs block mb-8">
                Ready to Transform Your Space?
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-[1.1] font-outfit">
                Start Your Luxury Flooring{' '}
                <span className="font-light italic text-secondary">Journey.</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <Link
                  href="/contact"
                  className="group relative bg-secondary text-white px-10 py-5 w-full sm:w-auto text-center font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:bg-black"
                >
                  <span className="flex items-center justify-center">
                    Request Quote
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </Link>
                <div className="flex items-center space-x-6 text-white font-bold tracking-widest">
                  <span className="hidden sm:inline-block w-8 h-[2px] bg-secondary" />
                  <span className="text-xs uppercase">or reach us at</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary/5 p-10 md:p-14 border border-white/10 backdrop-blur-sm self-start">
              <div className="flex flex-col space-y-10">
                <div className="flex items-center space-x-6 group cursor-pointer">
                  <div className="bg-secondary p-4 rounded-none group-hover:bg-black transition-colors">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] mb-1">
                      Direct Call
                    </span>
                    <span className="text-xl font-bold text-white tracking-widest">
                      +971 56 496 1186
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 group cursor-pointer">
                  <div className="bg-secondary p-4 rounded-none group-hover:bg-black transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] mb-1">
                      Email Sales
                    </span>
                    <span className="text-xl font-bold text-white tracking-widest break-all">
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
