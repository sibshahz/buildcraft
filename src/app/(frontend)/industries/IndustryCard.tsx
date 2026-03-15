'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building, Home, Hotel, Building2, Store } from 'lucide-react'
import { Industry, Media } from '@/payload-types'
import { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  hotel: Hotel,
  office: Building,
  villa: Home,
  mosque: Building2,
  shop: Store,
}

export const IndustryCard = ({ industry, index, onClick }: { industry: Industry; index: number; onClick: () => void }) => {
  const Icon = iconMap[industry.icon] || Building
  const imageUrl = (industry.bannerImage as Media)?.url || ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col h-full bg-white shadow-sm border border-secondary/5 hover:border-primary transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-64 w-full overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={industry.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
        )}
        <div className="absolute inset-0 bg-secondary/10 mix-blend-multiply transition-colors group-hover:bg-primary/10" />
      </div>

      <div className="p-8 md:p-10 flex flex-col flex-grow relative">
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-8 transition-colors group-hover:bg-primary">
          <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-2xl font-bold text-secondary mb-4 font-outfit tracking-tight group-hover:text-primary transition-colors">
          {industry.title}
        </h3>
        <p className="text-secondary/60 text-sm leading-relaxed mb-10 font-light flex-grow line-clamp-3">
          {industry.description}
        </p>
        <div className="flex items-center text-primary text-xs font-bold uppercase tracking-widest border-b border-primary/20 self-start pb-2 group-hover:border-primary transition-all duration-300">
          Discover Excellence
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  )
}
