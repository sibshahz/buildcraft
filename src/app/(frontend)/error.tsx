'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-offwhite px-6">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-onyx/5 rounded-full flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-gold/60" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-t border-gold/30 rounded-full"
              />
            </div>
          </div>

          <h1 className="text-4xl font-serif text-onyx mb-4">Something went wrong</h1>
          <p className="text-onyx/60 font-light leading-relaxed mb-10">
            We encountered an unexpected error while preparing your experience. Please try refreshing or return to the home page.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center px-8 py-4 bg-onyx text-white font-bold uppercase tracking-widest text-[10px] hover:bg-gold transition-colors duration-300 min-w-[160px]"
            >
              Try Again <RefreshCw className="ml-2 w-4 h-4" />
            </button>
            <a
              href="/"
              className="flex items-center justify-center px-8 py-4 border border-onyx/20 text-onyx font-bold uppercase tracking-widest text-[10px] hover:border-gold transition-colors duration-300 min-w-[160px]"
            >
              Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
