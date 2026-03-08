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

  // Deep smooth parallax
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-background"
    >
      {/* Background Media with Heritage Overlay */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 h-[130%]">
        {/* Subtle Moroccan/Islamic Pattern Overlay */}
        <div className="absolute inset-0 z-[6] opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none invert grayscale" />

        {/* Golden Cinematic Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-[5]" />
        <div className="absolute inset-0 bg-white/10 z-[4]" />

        <Image
          src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Carpet Craftsmanship UAE"
          fill
          priority
          className="object-cover scale-110 opacity-40"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Heritage Label */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-[1px] bg-onyx" />
              <span className="text-onyx font-bold uppercase tracking-[0.5em] text-[10px]">
                Established in UAE
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-serif leading-[0.9] text-onyx mb-10 tracking-tight">
              Premium Flooring <br />
              <span className="text-secondary italic font-light">for Elite Spaces.</span>
            </h1>

            <div className="w-24 h-1 bg-onyx mb-10 opacity-20" />

            <p className="text-onyx/70 text-lg md:text-2xl leading-relaxed mb-14 max-w-2xl font-outfit font-light tracking-wide">
              Supplying and installing high-quality carpets and bespoke flooring across luxury
              villas, hotels, and prestigious mosques in the UAE.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
              <Link
                href="/services"
                className="group relative bg-onyx text-background px-12 py-5 w-full sm:w-auto text-center font-bold uppercase tracking-[0.2em] text-[11px] overflow-hidden transition-all duration-500 shadow-xl hover:scale-105"
              >
                {/* Flashy Shimmer Effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-[45deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out" />

                <span className="relative z-10 flex items-center justify-center">
                  Explore Collections
                  <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/contact"
                className="group border-2 border-onyx text-onyx px-12 py-5 w-full sm:w-auto text-center font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-onyx hover:text-background transition-all duration-500 backdrop-blur-sm"
              >
                Request Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modern Royal Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute bottom-12 left-6 md:left-12 z-20 flex flex-col items-center"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] text-onyx/60 font-bold mb-4 rotate-90 origin-left translate-x-1">
          Scroll
        </span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-onyx to-transparent" />
      </motion.div>

      {/* Side Label */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center space-y-12">
        <div className="w-[1px] h-32 bg-onyx/10" />
        <span className="text-onyx/20 text-6xl font-serif rotate-90 whitespace-nowrap">
          BUILDCRAFT
        </span>
        <div className="w-[1px] h-32 bg-onyx/10" />
      </div>
    </section>
  )
}
