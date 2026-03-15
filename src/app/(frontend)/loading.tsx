'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-offwhite">
      <div className="relative flex flex-col items-center">
        {/* Luxury animated border/logo container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-32 h-32 relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-t-2 border-gold rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 border-r-2 border-onyx/20 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-onyx font-serif text-2xl font-light tracking-tighter">BC</span>
          </div>
        </motion.div>
        
        {/* Progress Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase font-bold text-onyx/40 tracking-[0.5em]">
            Elevating Spaces
          </span>
          <div className="w-48 h-[1px] bg-onyx/10 mt-4 relative overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 w-1/2 bg-gold"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
