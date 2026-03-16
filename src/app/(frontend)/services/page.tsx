import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { CTASection } from '@/components/sections/CTASection'
import { ServiceCard } from './ServiceCard'

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    limit: 100,
    overrideAccess: false,
  })

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative py-32 md:py-48 bg-onyx flex items-center overflow-hidden min-h-[70vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-onyx/40 via-onyx/80 to-onyx z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center scale-105" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
          <div>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
                Professional Expertise
              </span>
              <div className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] text-sand mb-10 tracking-tight">
              Elevated Flooring <br />
              <span className="text-gold font-light italic drop-shadow-2xl">
                Solutions for Every Need.
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Services Listing Section */}
      <section className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-auto gap-x-20 gap-y-32">
          {services.docs.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Specialty Section */}
      <section className="py-24 bg-secondary text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight font-outfit">
              Bespoke Solutions <br />
              <span className="text-primary">Tailored to You.</span>
            </h2>
            <p className="text-brand-offwhite/60 text-lg leading-relaxed mb-12">
              Not seeing what you need? BuildCraft specializes in custom carpeting and bespoke
              flooring solutions for unique architectural layouts. Our design and installation
              experts can consult with you to create something truly personalized.
            </p>
            <Link
              href="/contact"
              className="bg-primary text-white px-10 py-5 inline-block font-bold uppercase tracking-widest text-xs hover:bg-primary-dark transition-all duration-300"
            >
              Request Consultation
            </Link>
          </div>
          <div className="relative">
            <div className="w-full h-[500px] border border-white/5 opacity-40 group overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2000&auto=format&fit=crop"
                alt="Custom Carpeting"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-primary/20 backdrop-blur-3xl p-20 -z-10 rounded-full" />
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
