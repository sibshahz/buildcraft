'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Page } from '@/payload-types'

type StatsProps = Extract<Page['layout'][0], { blockType: 'stats' }>

export const StatsBlock: React.FC<StatsProps> = ({ stats }) => {
  if (!stats) return null

  return (
    <section className="py-20 bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col"
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 font-outfit">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/60">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
