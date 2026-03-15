'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Industry, Media } from '@/payload-types'
import { RichText } from '@/components/common/RichText'

interface IndustryModalProps {
  industry: Industry | null
  isOpen: boolean
  onClose: () => void
}

export const IndustryModal: React.FC<IndustryModalProps> = ({
  industry,
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && industry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-onyx/90 backdrop-blur-xl"
          />
          
          <motion.div
            layoutId={String(industry.id)}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-pearl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-2 bg-onyx text-white hover:bg-gold hover:text-onyx transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-1/2 relative h-[300px] md:h-auto">
              <Image
                src={(industry.bannerImage as Media)?.url || ''}
                alt={industry.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-pearl/20 md:to-transparent" />
            </div>

            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                Industry Focus
              </span>
              <h3 className="text-4xl md:text-5xl font-serif text-onyx mb-8 leading-tight">
                {industry.title}
              </h3>
              <div className="prose prose-onyx prose-sm max-w-none text-onyx/70 font-light leading-relaxed mb-10">
                <RichText content={industry.longDescription} />
              </div>
              <Link 
                 href="/contact"
                 onClick={onClose}
                 className="flex items-center justify-between w-full md:w-fit bg-onyx px-8 py-5 text-gold font-bold uppercase tracking-widest text-[10px] hover:bg-gold hover:text-onyx transition-all"
              >
                Contact Specialist
                <ArrowRight className="ml-4 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
