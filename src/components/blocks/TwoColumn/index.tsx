'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Page, Media } from '@/payload-types'
import { RichText } from '@/components/common/RichText'

type TwoColumnProps = Extract<Page['layout'][0], { blockType: 'twoColumn' }>

export const TwoColumnBlock: React.FC<TwoColumnProps> = ({
  heading,
  content,
  image,
  direction,
}) => {
  const imageUrl = (image as Media)?.url
  const isImageLeft = direction === 'imageLeft'

  return (
    <section className="py-24 md:py-32 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: isImageLeft ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={isImageLeft ? 'lg:order-2' : ''}
        >
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8 font-outfit">
              {heading}
            </h2>
          )}
          <RichText
            content={content}
            className="text-secondary/70 leading-relaxed text-lg font-light"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isImageLeft ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`relative h-[500px] overflow-hidden group ${isImageLeft ? 'lg:order-1' : ''}`}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={(image as Media)?.alt || heading || 'Image'}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-30 group-hover:opacity-0 transition-opacity duration-700" />
        </motion.div>
      </div>
    </section>
  )
}
