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
  return (
    <footer className="bg-secondary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/10 pb-16">
        {/* Brand Section */}
        <div className="flex flex-col space-y-8">
          <Link href="/" className="flex flex-col group">
            <span className="text-3xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
              BuildCraft
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Flooring & Décor
            </span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            A UAE-based flooring solutions provider delivering high-quality carpets and premium
            flooring across the United Arab Emirates.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://instagram.com/buildcraftflooring"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 p-2 rounded-full hover:bg-primary transition-all duration-300"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="mailto:sales@buildcraftflooring.ae"
              className="bg-white/5 p-2 rounded-full hover:bg-primary transition-all duration-300"
            >
              <Mail className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Services Column */}
        <div className="flex flex-col space-y-8">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
            Our Services
          </h4>
          <ul className="flex flex-col space-y-3">
            {services.map((service) => (
              <li key={service}>
                <Link
                  href="/services"
                  className="text-white/60 text-sm hover:text-white transition-colors border-b border-transparent hover:border-primary pb-0.5"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries Column */}
        <div className="flex flex-col space-y-8">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
            Industries Served
          </h4>
          <ul className="flex flex-col space-y-3">
            {industries.map((ind) => (
              <li key={ind}>
                <Link
                  href="/industries"
                  className="text-white/60 text-sm hover:text-white transition-colors border-b border-transparent hover:border-primary pb-0.5"
                >
                  {ind}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col space-y-8">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Contact Us</h4>
          <div className="flex flex-col space-y-6">
            <div className="flex items-start space-x-4">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">
                  Phone
                </span>
                <span className="text-sm text-white/80 font-medium">+971 56 496 1186</span>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">
                  Email
                </span>
                <span className="text-sm text-white/80 font-medium">
                  sales@buildcraftflooring.ae
                </span>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">
                  Location
                </span>
                <span className="text-sm text-white/80 font-medium">Ajman Free Zone, UAE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 flex flex-col md:flex-row justify-between items-center text-white/40 text-xs">
        <p>&copy; {new Date().getFullYear()} BuildCraft Flooring & Décor. All Rights Reserved.</p>
        <p className="mt-4 md:mt-0 uppercase tracking-widest">Premium Quality Flooring</p>
      </div>
    </footer>
  )
}
