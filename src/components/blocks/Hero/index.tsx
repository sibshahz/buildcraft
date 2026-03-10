'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Page, Media } from '@/payload-types'

type HeroProps = Extract<Page['layout'][0], { blockType: 'hero' }>

export const HeroBlock: React.FC<HeroProps> = ({ heading, subheading, backgroundImage }) => {
  const imageUrl = (backgroundImage as Media)?.url

  return (
    <section className="relative py-24 md:py-32 bg-secondary flex items-center overflow-hidden min-h-[60vh]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-secondary/80 z-10" />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={(backgroundImage as Media)?.alt || heading}
            fill
            className="object-cover bg-fixed bg-center"
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-outfit">
            {heading}
          </h1>
          {subheading && (
            <p className="text-sand/80 text-lg md:text-xl max-w-2xl mx-auto font-light">
              {subheading}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
