'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CTASection } from '@/components/sections/CTASection'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const allServices = [
  {
    title: 'Wall-to-Wall Carpets',
    slug: 'wall-to-wall',
    description: 'High-end, full-room carpeting for high-traffic and luxury environments.',
    image:
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=2070&auto=format&fit=crop',
    details: ['Premium Texture', 'Sound Insulation', 'Luxury Feel'],
  },
  {
    title: 'Mosque Carpets',
    slug: 'mosque-carpets',
    description: 'Specialized spiritual space carpets focusing on comfort and durability.',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
    details: ['Comfortable for Prayer', 'Durability', 'Spiritual Aesthetics'],
  },
  {
    title: 'Carpet Tiles',
    slug: 'carpet-tiles',
    description: 'Modular flooring solutions ideal for modern office and corporate spaces.',
    image:
      'https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?q=80&w=2070&auto=format&fit=crop',
    details: ['Easy to Clean', 'Versatile Design', 'Heavy Duty'],
  },
  {
    title: 'Rugs',
    slug: 'rugs',
    description: 'Customized area rugs that add a touch of personality and luxury to any room.',
    image:
      'https://images.unsplash.com/photo-1579656335342-fdf4678126c1?q=80&w=2070&auto=format&fit=crop',
    details: ['Hand-Carved', 'Artful Design', 'Custom Sizing'],
  },
  {
    title: 'Hospitality Carpets',
    slug: 'hospitality',
    description: 'Tailored solutions for guest rooms, corridors, lobbies, and banquet halls.',
    image:
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2070&auto=format&fit=crop',
    details: ['Hotel Standard', 'High Traffic', 'Elegant Style'],
  },
  {
    title: 'SPC LVT Flooring',
    slug: 'spc-lvt',
    description: 'Rigid core flooring that offers the beauty of wood and the durability of stone.',
    image:
      'https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?q=80&w=2070&auto=format&fit=crop',
    details: ['Waterproof', 'Scratch Resistant', 'Luxury Aesthetic'],
  },
  {
    title: 'Outdoor & Kitchen Mats',
    slug: 'mats',
    description: 'Functional and heavy-duty mats for kitchens and outdoor entrances.',
    image:
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=2070&auto=format&fit=crop',
    details: ['Anti-Slip', 'Easy Maintenance', 'Durable'],
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative py-24 md:py-32 bg-secondary flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Professional Expertise
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-outfit">
              Elevated Flooring <br />
              <span className="text-primary font-light italic text-2xl md:text-5xl">
                Solutions for Every Need.
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Services Listing Section */}
      <section className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-auto gap-x-20 gap-y-32">
          {allServices.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="relative h-[400px] w-full overflow-hidden mb-10 group">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply opacity-20" />
                <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 bg-primary p-4 lg:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4">
                  Service {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-6 font-outfit">
                  {service.title}
                </h3>
                <p className="text-secondary/60 text-lg leading-relaxed mb-10 font-light max-w-xl">
                  {service.description}
                </p>
                <div className="flex items-center space-x-12 mb-10">
                  {service.details.map((detail) => (
                    <div key={detail} className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1">
                        {detail}
                      </span>
                      <div className="w-6 h-[1px] bg-secondary/10" />
                    </div>
                  ))}
                </div>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-center text-secondary font-bold uppercase tracking-widest text-[10px] border-b border-primary/20 self-start pb-2 hover:border-primary transition-all duration-300"
                >
                  View Service Details
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </motion.div>
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
