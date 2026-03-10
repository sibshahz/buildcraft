import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-onyx flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Decorative Heritage Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl px-6">
        <span className="text-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block">
          Error 404
        </span>

        <h1 className="text-6xl md:text-8xl font-serif text-sand mb-8 leading-[0.9]">
          The Space You seek <br />
          <span className="italic font-light italic text-gold">is currently elsewhere.</span>
        </h1>

        <p className="text-sand/40 text-lg md:text-xl font-light leading-relaxed mb-12 font-outfit">
          Whatever you were looking for doesn&apos;t exist at this location.{' '}
          <br className="hidden md:block" />
          Allow us to guide you back to our established foundations.
        </p>

        <Link
          href="/"
          className="group inline-flex items-center text-gold font-bold uppercase tracking-[0.3em] text-[10px] border-b border-gold/40 pb-3 hover:border-gold transition-all duration-300"
        >
          <ArrowLeft className="mr-3 w-4 h-4 transition-transform group-hover:-translate-x-2" />
          Return to Zenith
        </Link>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 z-0 hidden lg:flex flex-col items-center space-y-12 select-none opacity-10">
        <div className="w-[1px] h-32 bg-sand/20" />
        <span className="text-sand text-6xl font-serif rotate-90 whitespace-nowrap">NOT FOUND</span>
        <div className="w-[1px] h-32 bg-sand/20" />
      </div>
    </div>
  )
}
