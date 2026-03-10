'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Page } from '@/payload-types'

type CTAProps = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CTABlock: React.FC<CTAProps> = ({ heading, subheading, buttonText, buttonLink }) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-secondary p-12 md:p-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/20 transition-colors duration-1000" />

          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-outfit leading-tight">
              {heading}
            </h2>
            {subheading && <p className="text-sand/60 text-lg mb-10 font-light">{subheading}</p>}
            <Link
              href={buttonLink || '/contact'}
              className="inline-flex items-center px-8 py-4 bg-primary text-secondary font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors duration-500"
            >
              {buttonText}
              <ArrowRight className="ml-3 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
