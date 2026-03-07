'use client'

import {
  Phone,
  Mail,
  MapPin,
  Send,
  Instagram,
  ArrowRight,
  MessageSquare,
  Clock,
} from 'lucide-react'
import { CTASection } from '@/components/sections/CTASection'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const [status, setStatus] = useState<null | 'success' | 'loading'>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative py-24 md:py-32 bg-secondary flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-outfit">
              Ready to Start Your <br />
              <span className="text-primary font-light italic text-2xl md:text-5xl">
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
                    href="tel:+971564961186"
                    className="text-xl font-bold text-secondary tracking-widest hover:text-primary transition-colors"
                  >
                    +971 56 496 1186
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
                    href="mailto:sales@buildcraftflooring.ae"
                    className="text-xl font-bold text-secondary tracking-widest hover:text-primary transition-colors"
                  >
                    sales@buildcraftflooring.ae
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
                    Ajman Free Zone, UAE
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
                href="https://instagram.com/buildcraftflooring"
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
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-[500px] text-center">
                <div className="w-20 h-20 bg-primary/20 flex items-center justify-center mb-8 rounded-full">
                  <Send className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-secondary mb-4 font-outfit">
                  Message Sent!
                </h2>
                <p className="text-secondary/60 max-w-xs mx-auto mb-10">
                  We have received your details and our team will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus(null)}
                  className="text-primary font-bold uppercase tracking-widest text-xs border-b border-primary/20 pb-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label
                    className="text-[10px] uppercase font-bold text-secondary/40 tracking-widest"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    className="w-full bg-brand-offwhite/30 border-b border-secondary/10 p-4 focus:outline-none focus:border-primary transition-colors text-secondary font-medium"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label
                      className="text-[10px] uppercase font-bold text-secondary/40 tracking-widest"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      className="w-full bg-brand-offwhite/30 border-b border-secondary/10 p-4 focus:outline-none focus:border-primary transition-colors text-secondary font-medium"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-[10px] uppercase font-bold text-secondary/40 tracking-widest"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      required
                      type="tel"
                      className="w-full bg-brand-offwhite/30 border-b border-secondary/10 p-4 focus:outline-none focus:border-primary transition-colors text-secondary font-medium"
                      placeholder="+971 -- --- ----"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-[10px] uppercase font-bold text-secondary/40 tracking-widest"
                    htmlFor="service"
                  >
                    Interested Service
                  </label>
                  <select
                    id="service"
                    className="w-full bg-brand-offwhite/30 border-b border-secondary/10 p-4 focus:outline-none focus:border-primary transition-colors text-secondary font-medium appearance-none"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="">Select a service</option>
                    <option value="wall-to-wall">Wall-to-wall Carpets</option>
                    <option value="mosque">Mosque Carpets</option>
                    <option value="lvt">SPC LVT Flooring</option>
                    <option value="hospitality">Hospitality Carpets</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-[10px] uppercase font-bold text-secondary/40 tracking-widest"
                    htmlFor="message"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-brand-offwhite/30 border-b border-secondary/10 p-4 focus:outline-none focus:border-primary transition-colors text-secondary font-medium resize-none"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  disabled={status === 'loading'}
                  className="w-full bg-secondary text-white py-6 font-bold uppercase tracking-widest text-xs hover:bg-black transition-all duration-300 flex items-center justify-center"
                >
                  {status === 'loading' ? (
                    'Sending...'
                  ) : (
                    <span className="flex items-center">
                      Send Message <Send className="ml-3 w-4 h-4" />
                    </span>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] w-full bg-secondary overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000">
        <div className="absolute inset-0 bg-secondary/40 z-10 pointer-events-none" />
        {/* Simple representative "map" pattern or image */}
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop')] bg-cover bg-center" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 md:p-12 shadow-2xl z-20 text-center max-w-xs flex flex-col items-center">
          <MapPin className="w-10 h-10 text-primary mb-6" />
          <h4 className="font-bold text-secondary font-outfit text-xl mb-4">Ajman Free Zone</h4>
          <p className="text-secondary/60 text-xs uppercase tracking-widest font-bold">
            Ajman, UAE
          </p>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
