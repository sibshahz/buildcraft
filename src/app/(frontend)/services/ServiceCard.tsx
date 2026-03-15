'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Service, Media } from '@/payload-types'

export const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const imageUrl = (service.image as Media)?.url || ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="flex flex-col group"
    >
      <Link href={`/services/${service.slug}`} className="flex flex-col h-full">
        <div className="relative h-[400px] w-full overflow-hidden mb-10 group">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply opacity-20" />
          <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 bg-primary p-4 lg:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4">
            Service {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-6 font-outfit group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-secondary/60 text-lg leading-relaxed mb-10 font-light max-w-xl">
            {service.description}
          </p>
          <div className="flex items-center flex-wrap gap-x-12 gap-y-4 mb-10">
            {service.layout?.map(block => {
              if (block.blockType === 'features' && block.items) {
                return block.items.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1">
                      {f.feature}
                    </span>
                    <div className="w-6 h-[1px] bg-secondary/10" />
                  </div>
                ))
              }
              return null
            })}
          </div>
          <div className="group flex items-center text-secondary font-bold uppercase tracking-widest text-[10px] border-b border-primary/20 self-start pb-2 group-hover:border-primary transition-all duration-300">
            View Service Details
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
