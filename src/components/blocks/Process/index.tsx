'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Page } from '@/payload-types'

type ProcessProps = Extract<Page['layout'][0], { blockType: 'process' }>

export const ProcessBlock: React.FC<ProcessProps> = ({ heading, subheading, steps }) => {
  return (
    <section className="py-24 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {(heading || subheading) && (
          <div className="text-center mb-20 max-w-3xl mx-auto">
            {heading && (
              <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6 font-outfit">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-secondary/60 text-lg leading-relaxed">{subheading}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps?.map((step, index) => (
            <motion.div
              key={step.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative p-10 bg-white border border-secondary/5 group hover:border-primary/20 transition-all duration-500"
            >
              <span className="absolute -top-6 -left-6 w-12 h-12 bg-primary text-white flex items-center justify-center font-bold text-xl font-outfit">
                0{index + 1}
              </span>
              <h3 className="text-2xl font-bold text-secondary mb-6 mt-4 font-outfit group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-secondary/60 leading-relaxed font-light">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
