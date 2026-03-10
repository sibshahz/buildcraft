'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, Target } from 'lucide-react'
import { Page } from '@/payload-types'

type ValuesProps = Extract<Page['layout'][0], { blockType: 'values' }>

const iconMap = {
  shield: Shield,
  users: Users,
  target: Target,
}

export const ValuesBlock: React.FC<ValuesProps> = ({ heading, subheading, values }) => {
  return (
    <section className="py-24 bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          {subheading && (
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
              {subheading}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold font-outfit">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {(values || []).map((v, i) => {
            const Icon = iconMap[v.icon as keyof typeof iconMap] || Shield
            return (
              <motion.div
                key={v.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white/5 border border-white/5 p-10 hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-8">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-outfit">{v.title}</h3>
                <p className="text-brand-offwhite/50 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
