'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Service, Media } from '@/payload-types'

interface ServicesGridProps {
  heading?: string | null
  subheading?: string | null
  services?: Service[]
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  heading = 'Comprehensive Flooring Masterpieces.',
  subheading = 'Our Expertise',
  services = []
}) => {
  return (
    <section className="py-24 md:py-40 bg-sand" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col mb-24 max-w-3xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-10 h-[1px] bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
              Our Expertise
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-onyx leading-tight">
            Comprehensive <br />
            <span className="italic font-light">Flooring Masterpieces.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {services.map((service, index) => {
            const imageUrl = (service.image as Media)?.url
            const href = `/services/${service.slug}`
            
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col"
              >
                <Link
                  href={href}
                  className="relative aspect-[4/5] overflow-hidden mb-8 bg-pearl"
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0 shadow-xl"
                    />
                  )}
                  {/* Decorative Frame Overlay */}
                  <div className="absolute inset-0 border-[0px] group-hover:border-[12px] border-onyx/10 transition-all duration-700 pointer-events-none" />
  
                  {/* Reveal Arrow */}
                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                    <ArrowUpRight className="w-6 h-6 text-onyx" />
                  </div>
                </Link>
  
                <div className="flex flex-col">
                  {service.category && (
                    <span className="text-gold font-bold uppercase tracking-widest text-[9px] mb-3">
                      {service.category}
                    </span>
                  )}
                  <h3 className="text-2xl font-serif text-onyx mb-4 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-onyx/60 text-sm leading-relaxed font-light line-clamp-2">
                    {service.description}
                  </p>
  
                  <div className="mt-6 w-0 group-hover:w-full h-[1px] bg-gold/30 transition-all duration-700" />
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-24 pt-16 border-t border-onyx/5 flex justify-center">
          <Link href="/services" className="group flex flex-col items-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-onyx/40 group-hover:text-gold transition-colors">
              Discover the Full Portfolio
            </span>
            <div className="w-12 h-12 rounded-full border border-onyx/10 flex items-center justify-center group-hover:bg-onyx group-hover:border-onyx transition-all duration-500">
              <ArrowUpRight className="w-5 h-5 text-onyx group-hover:text-gold" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
