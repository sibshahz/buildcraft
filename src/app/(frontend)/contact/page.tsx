import React from 'react'
import { Phone, Mail, MapPin, Instagram, Clock } from 'lucide-react'
import { CTASection } from '@/components/sections/CTASection'
import * as motion from 'framer-motion/client'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ContactForm } from '@/components/sections/ContactForm'

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const { phone, email, address, socialLinks } = settings
  const instagramLink =
    socialLinks?.find((link: any) => link.platform === 'instagram')?.url ||
    'https://instagram.com/buildcraftflooring'

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative py-32 md:py-48 bg-onyx flex items-center overflow-hidden min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-onyx/40 via-onyx/80 to-onyx z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center scale-105" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
                Contact Us
              </span>
              <div className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] text-sand mb-10 tracking-tight">
              Ready to Start Your <br />
              <span className="text-gold font-light italic drop-shadow-2xl">
                Next Luxury Project?
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-secondary mb-6 font-outfit">Get in Touch</h2>
              <p className="text-secondary/60 text-lg font-light leading-relaxed max-w-md">
                Contact us today for a consultation or to request a direct quote for your flooring
                needs across the UAE.
              </p>
            </div>

            <div className="space-y-12">
              {/* Phone */}
              <div className="flex items-start space-x-6 group">
                <div className="bg-primary p-4 rounded-none group-hover:bg-primary-dark transition-colors shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-secondary/40 tracking-[0.2em] mb-1">
                    Direct Line
                  </span>
                  <a
                    href={`tel:${phone}`}
                    className="text-xl font-bold text-secondary tracking-widest hover:text-primary transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-6 group">
                <div className="bg-primary p-4 rounded-none group-hover:bg-primary-dark transition-colors shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-secondary/40 tracking-[0.2em] mb-1">
                    Email Sales
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-xl font-bold text-secondary tracking-widest hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-6 group">
                <div className="bg-primary p-4 rounded-none group-hover:bg-primary-dark transition-colors shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-secondary/40 tracking-[0.2em] mb-1">
                    Location
                  </span>
                  <span className="text-xl font-bold text-secondary tracking-widest">
                    {address}
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-6 group">
                <div className="bg-primary p-4 rounded-none group-hover:bg-primary-dark transition-colors shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-secondary/40 tracking-[0.2em] mb-1">
                    Working Hours
                  </span>
                  <span className="text-xl font-bold text-secondary tracking-widest">
                    Mon - Sat: 9:00 - 18:00
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-16 flex items-center space-x-8 pt-10 border-t border-secondary/10">
              <span className="text-xs uppercase font-bold tracking-widest text-secondary/40">
                Follow Us
              </span>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 text-secondary hover:text-primary transition-colors"
              >
                <Instagram className="w-6 h-6" />
                <span className="font-bold text-sm">buildcraftflooring</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 md:p-14 shadow-2xl relative border border-secondary/5"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] w-full bg-secondary overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000">
        <div className="absolute inset-0 bg-secondary/40 z-10 pointer-events-none" />
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop')] bg-cover bg-center" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 md:p-12 shadow-2xl z-20 text-center max-w-xs flex flex-col items-center">
          <MapPin className="w-10 h-10 text-primary mb-6" />
          <h4 className="font-bold text-secondary font-outfit text-xl mb-4">Our Gallery</h4>
          <p className="text-secondary/60 text-xs uppercase tracking-widest font-bold">{address}</p>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
