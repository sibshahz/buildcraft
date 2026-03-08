'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Mail, MapPin, Phone, ArrowUp } from 'lucide-react'

const services = [
  'Wall-to-wall carpets',
  'Mosque carpets',
  'Carpet tiles',
  'Rugs',
  'Hospitality carpets',
  'SPC LVT Flooring',
  'Outdoor mats',
  'Kitchen mats',
]

const industries = [
  'Hotels & Hospitality',
  'Offices & Corporate Spaces',
  'Villas & Residential',
  'Mosques & Prayer Facilities',
  'Commercial Fit Outs',
  'Institutional Projects',
]

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-royal text-sand pt-32 pb-16 relative overflow-hidden">
      {/* Decorative Heritage Pattern */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-12 border-b border-sand/10 pb-24 relative z-10">
        {/* Brand Section */}
        <div className="flex flex-col space-y-10">
          <Link
            href="/"
            className="flex flex-col group transition-transform duration-500 hover:scale-105"
          >
            <span className="text-4xl font-serif tracking-tight text-sand group-hover:text-gold transition-colors">
              BuildCraft
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mt-2">
              Ajman • UAE
            </span>
          </Link>
          <p className="text-sand/40 text-sm leading-relaxed max-w-xs font-light">
            Licensed in Ajman Free Zone, providing elite architectural flooring and bespoke
            carpeting across the United Arab Emirates since our inception.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com/buildcraftflooring"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-sand/20 flex items-center justify-center rounded-full hover:bg-gold hover:border-gold group transition-all duration-500"
            >
              <Instagram className="w-5 h-5 text-sand group-hover:text-royal transition-colors" />
            </a>
            <a
              href="mailto:sales@buildcraftflooring.ae"
              className="w-12 h-12 border border-sand/20 flex items-center justify-center rounded-full hover:bg-gold hover:border-gold group transition-all duration-500"
            >
              <Mail className="w-5 h-5 text-sand group-hover:text-royal transition-colors" />
            </a>
          </div>
        </div>

        {/* Services Column */}
        <div className="flex flex-col space-y-10">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">
            The Collections
          </h4>
          <ul className="flex flex-col space-y-4">
            {services.map((service) => (
              <li key={service} className="group overflow-hidden">
                <Link
                  href="/services"
                  className="text-sand/60 text-sm hover:text-gold transition-all duration-300 flex items-center"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-gold mr-0 group-hover:mr-3 transition-all duration-500" />
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries Column */}
        <div className="flex flex-col space-y-10">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">
            Strategic Sectors
          </h4>
          <ul className="flex flex-col space-y-4">
            {industries.map((ind) => (
              <li key={ind} className="group overflow-hidden">
                <Link
                  href="/industries"
                  className="text-sand/60 text-sm hover:text-gold transition-all duration-300 flex items-center"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-gold mr-0 group-hover:mr-3 transition-all duration-500" />
                  {ind}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col space-y-10">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Concierge</h4>
          <div className="flex flex-col space-y-8">
            <div className="flex items-start space-x-6">
              <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
              <div className="flex flex-col">
                <span className="text-[9px] text-sand/20 uppercase tracking-[0.2em] font-bold mb-2">
                  Direct Line
                </span>
                <span className="text-lg font-serif italic text-sand hover:text-gold transition-colors cursor-pointer">
                  +971 56 496 1186
                </span>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
              <div className="flex flex-col">
                <span className="text-[9px] text-sand/20 uppercase tracking-[0.2em] font-bold mb-2">
                  Regional HQ
                </span>
                <span className="text-sm font-light text-sand/80">
                  Ajman Free Zone, United Arab Emirates
                </span>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.4em] font-bold text-gold/40 hover:text-gold transition-colors group mt-4"
            >
              <span>Back to Zenith</span>
              <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold transition-colors">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 flex flex-col md:flex-row justify-between items-center text-sand/20 text-[10px] uppercase tracking-[0.3em] font-bold relative z-10">
        <p>
          &copy; {new Date().getFullYear()} BuildCraft Flooring & Décor. Architectural Precision.
        </p>
        <p className="mt-6 md:mt-0 opacity-40">Licensed in the United Arab Emirates</p>
      </div>
    </footer>
  )
}
