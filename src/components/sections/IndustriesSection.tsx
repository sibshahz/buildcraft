'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Industry, Media } from '@/payload-types'
import { 
  Hotel, 
  Building2, 
  Home, 
  Palmtree, 
  ShoppingBag, 
  GraduationCap,
  X,
  ArrowRight
} from 'lucide-react'
import { RichText } from '@/components/common/RichText'

import Link from 'next/link'
import { IndustryModal } from './IndustryModal'

const iconMap = {
  hotel: Hotel,
  office: Building2,
  villa: Home,
  mosque: Palmtree,
  retail: ShoppingBag,
  graduation: GraduationCap,
}

interface IndustriesSectionProps {
  heading?: string | null
  subheading?: string | null
  industries?: Industry[] | null
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  heading = 'Industries We Elevate.',
  subheading = 'Strategic Partners',
  industries,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null)

  return (
    <section className="py-24 md:py-48 bg-onyx relative overflow-hidden">
      {/* Dynamic Background Noise/Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-4 mb-6"
          >
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
              {subheading}
            </span>
            <div className="w-8 h-[1px] bg-gold" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif text-white max-w-3xl leading-tight"
          >
            {heading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {industries?.map((industry, index) => {
            const Icon = iconMap[industry.icon as keyof typeof iconMap] || Building2
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => setSelectedIndustry(industry)}
                className="group relative h-[450px] border-[0.5px] border-white/10 overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <Image
                  src={(industry.bannerImage as Media)?.url || ''}
                  alt={industry.title}
                  fill
                  className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent opacity-90" />

                <div className="relative h-full p-12 flex flex-col justify-end">
                  <div className="mb-8 p-4 w-fit bg-gold/10 backdrop-blur-sm border border-gold/20 group-hover:bg-gold group-hover:text-onyx transition-colors duration-500">
                    <Icon className="w-6 h-6 text-gold group-hover:text-onyx" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4">
                    {industry.title}
                  </h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed mb-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {industry.description}
                  </p>
                  <div className="flex items-center text-gold font-bold uppercase tracking-[0.2em] text-[10px]">
                    <span className="mr-3">Discover Excellence</span>
                    <ArrowRight className="w-3 h-3 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <IndustryModal 
        industry={selectedIndustry}
        isOpen={!!selectedIndustry}
        onClose={() => setSelectedIndustry(null)}
      />
    </section>
  )
}
