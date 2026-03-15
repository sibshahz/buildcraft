'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send } from 'lucide-react'
import Script from 'next/script'
import { submitContactForm } from '@/app/(frontend)/contact/actions'

export function ContactForm() {
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
    }

    return () => {
      if (widgetIdRef.current && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetIdRef.current)
      }
    }
  }, [errors.turnstile])

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
    if (status === 'loading') return

    if (!validateForm()) return

    setStatus('loading')

    try {
      const result = await submitContactForm(formData)
      
      if (result.success) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          turnstileToken: '',
        })
      } else {
        console.error('Failed to submit contact request', result.error)
        setStatus(null)
        alert(result.error)
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
    <>
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
            {errors.name ? <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.name}</p> : null}
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
              {errors.email ? <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.email}</p> : null}
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
              {errors.phone ? <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.phone}</p> : null}
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
            {errors.service ? <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.service}</p> : null}
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
            {errors.message ? <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.message}</p> : null}
          </div>

          {process.env.NODE_ENV !== 'development' ? (
            <div className="flex flex-col space-y-2">
              <div ref={turnstileContainerRef} id="turnstile-widget" />
              {errors.turnstile ? <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight">{errors.turnstile}</p> : null}
            </div>
          ) : null}

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

      {process.env.NODE_ENV !== 'development' ? (
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
      ) : null}
    </>
  )
}
