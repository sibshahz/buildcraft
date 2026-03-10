'use client'

import React from 'react'
import { Page } from '@/payload-types'

type QuoteProps = Extract<Page['layout'][0], { blockType: 'quote' }>

export const QuoteBlock: React.FC<QuoteProps> = ({ quote, author, role }) => {
  return (
    <section className="py-24 bg-brand-offwhite flex flex-col items-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-24 h-1 bg-primary mb-12 mx-auto" />
        <blockquote className="text-3xl md:text-4xl font-light italic text-secondary leading-snug mb-12">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-bold text-secondary uppercase tracking-widest font-outfit">
            {author}
          </h4>
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mt-2">{role}</p>
        </div>
      </div>
    </section>
  )
}
