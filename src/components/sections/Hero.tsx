'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export const Hero = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth parallax: move image up by 20% of its height as we scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5])

  return (
    <section
      ref={containerRef}
      className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-secondary"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-secondary/30 z-10 pointer-events-none" />

      {/* Parallax Background Image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 h-[120%]">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/70 to-transparent z-[5]" />
        <Image
          src="https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2070&auto=format&fit=crop"
          alt="Premium Luxury Interior"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-primary font-bold uppercase tracking-[0.4em] text-xs mb-6 px-1">
              Excellence in Every Fiber
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white leading-[1.0] mb-8 font-outfit tracking-tighter">
              Elevating <br />
              <span className="text-white/20 font-light italic">Architecture.</span>
            </h1>
            <p className="text-white/80 text-lg md:text-2xl leading-relaxed mb-12 max-w-xl font-light">
              BuildCraft Flooring & Décor provides premium flooring solutions across the UAE,
              specializing in luxury carpets and architectural flooring for elite projects.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/services"
                className="group relative bg-primary text-white px-10 py-5 w-full sm:w-auto text-center font-bold uppercase tracking-widest text-xs overflow-hidden transition-all duration-300 hover:bg-primary-dark"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Explore Services
                  <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/projects"
                className="group border border-white/40 text-white px-10 py-5 w-full sm:w-auto text-center font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-secondary transition-all duration-500"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>

      {/* Decorative City Labels */}
      <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
        <div className="flex items-center space-x-6">
          <div className="w-12 h-[1px] bg-primary/40" />
          <span className="text-primary text-[10px] uppercase tracking-[0.6em] font-bold">
            AJMAN • DUBAI • ABU DHABI
          </span>
        </div>
      </div>
    </section>
  )
}
