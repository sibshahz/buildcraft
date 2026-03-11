'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Page, Media } from '@/payload-types'

type HeroProps = Extract<Page['layout'][0], { blockType: 'hero' }>

export const HeroBlock: React.FC<HeroProps> = ({ heading, subheading, backgroundImage }) => {
  const imageUrl = (backgroundImage as Media)?.url

  return (
    <section className="relative py-32 md:py-48 bg-onyx flex items-center overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/40 via-onyx/80 to-onyx z-10" />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={(backgroundImage as Media)?.alt || heading}
            fill
            priority
            className="object-cover scale-105 transition-transform duration-1000"
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle Label Line */}
          <div className="flex items-center justify-center space-x-4 mb-8 opacity-60">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
              BuildCraft Legacy
            </span>
            <div className="w-8 h-[1px] bg-gold" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] text-sand mb-10 tracking-tight">
            {heading}
          </h1>
          
          <div className="w-20 h-[1px] bg-gold/30 mx-auto mb-10" />

          {subheading && (
            <p className="text-sand/70 text-lg md:text-2xl max-w-2xl mx-auto font-outfit font-light tracking-wide leading-relaxed">
              {subheading}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
