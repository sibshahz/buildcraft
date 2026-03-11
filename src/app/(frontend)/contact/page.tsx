'use client'

import { Phone, Mail, MapPin, Send, Instagram, Clock } from 'lucide-react'
import { CTASection } from '@/components/sections/CTASection'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Script from 'next/script'
import { useSiteSettings } from '@/providers/SiteSettingsContext'

export default function ContactPage() {
  const { phone, email, address, socialLinks } = useSiteSettings()
  const instagramLink =
    socialLinks?.find((link) => link.platform === 'instagram')?.url ||
    'https://instagram.com/buildcraftflooring'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    turnstileToken: '',
  })

  const [status, setStatus] = useState<null | 'success' | 'loading'>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const turnstileContainerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    const renderTurnstile = () => {
      if (typeof window !== 'undefined' && (window as any).turnstile && turnstileContainerRef.current) {
        widgetIdRef.current = (window as any).turnstile.render(turnstileContainerRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          callback: (token: string) => {
            setFormData((prev) => ({ ...prev, turnstileToken: token }))
            if (errors.turnstile) setErrors((prev) => ({ ...prev, turnstile: '' }))
          },
        })
      }
    }

    if ((window as any).turnstile) {
      renderTurnstile()
    } else {
      // If script not loaded yet, or we're using next/script's onReady
    }

    return () => {
      if (widgetIdRef.current && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetIdRef.current)
      }
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (formData.phone.length < 7) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    if (!formData.service) newErrors.service = 'Please select a service'
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Please enter at least 10 characters'
    }
    if (process.env.NODE_ENV !== 'development' && !formData.turnstileToken) {
      newErrors.turnstile = 'Please complete the security check'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return // Prevent multiple submissions

    if (!validateForm()) return

    setStatus('loading')

    try {
      const response = await fetch('/api/contact-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          turnstileToken: '',
        })
        if (widgetIdRef.current && (window as any).turnstile) {
          (window as any).turnstile.reset(widgetIdRef.current)
        }
      } else {
        const data = await response.json()
        console.error('Failed to submit contact request', data)
        setStatus(null)
        alert(data.errors?.[0]?.message || 'Something went wrong. Please try again.')
        if (widgetIdRef.current && (window as any).turnstile) {
          (window as any).turnstile.reset(widgetIdRef.current)
        }
      }
    } catch (error) {
      console.error('Error submitting contact request:', error)
      setStatus(null)
      alert('Something went wrong. Please try again.')
      if (widgetIdRef.current && (window as any).turnstile) {
        (window as any).turnstile.reset(widgetIdRef.current)
      }
    }
  }

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
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
                    }}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.name}</p>}
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
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
                      }}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.email}</p>}
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
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value })
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
                      }}
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.phone}</p>}
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
                    onChange={(e) => {
                      setFormData({ ...formData, service: e.target.value })
                      if (errors.service) setErrors((prev) => ({ ...prev, service: '' }))
                    }}
                  >
                    <option value="">Select a service</option>
                    <option value="wall-to-wall">Wall-to-wall Carpets</option>
                    <option value="mosque">Mosque Carpets</option>
                    <option value="lvt">SPC LVT Flooring</option>
                    <option value="hospitality">Hospitality Carpets</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.service}</p>}
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
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }))
                    }}
                  />
                  {errors.message && <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.message}</p>}
                </div>

                {process.env.NODE_ENV !== 'development' && (
                  <div className="flex flex-col space-y-2">
                    <div ref={turnstileContainerRef} id="turnstile-widget" />
                    {errors.turnstile && <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.turnstile}</p>}
                  </div>
                )}

                <button
                  disabled={status === 'loading'}
                  className={`w-full py-6 font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center ${
                    status === 'loading'
                      ? 'bg-secondary/50 cursor-not-allowed grayscale'
                      : 'bg-secondary text-white hover:bg-black'
                  }`}
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
          <h4 className="font-bold text-secondary font-outfit text-xl mb-4">Our Gallery</h4>
          <p className="text-secondary/60 text-xs uppercase tracking-widest font-bold">{address}</p>
        </div>
      </section>

      <CTASection />
      {process.env.NODE_ENV !== 'development' && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (!(window as any).turnstile) return
            if (turnstileContainerRef.current && !widgetIdRef.current) {
              widgetIdRef.current = (window as any).turnstile.render(turnstileContainerRef.current, {
                sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
                callback: (token: string) => {
                  setFormData((prev) => ({ ...prev, turnstileToken: token }))
                  if (errors.turnstile) setErrors((prev) => ({ ...prev, turnstile: '' }))
                },
              })
            }
          }}
        />
      )}
    </div>
  )
}
