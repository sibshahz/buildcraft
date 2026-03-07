'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    title: 'Wall-to-Wall Carpets',
    description: 'Luxurious full-room carpeting for high-end residential and commercial spaces.',
    image:
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop',
    href: '/services/wall-to-wall',
  },
  {
    title: 'Mosque Carpets',
    description:
      'Expertly designed carpets for spiritual spaces, focusing on durability and comfort.',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
    href: '/services/mosque-carpets',
  },
  {
    title: 'SPC LVT Flooring',
    description:
      'Premium rigid core flooring combining extreme durability with elegant wood aesthetics.',
    image:
      'https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?q=80&w=2070&auto=format&fit=crop',
    href: '/services/spc-lvt',
  },
  {
    title: 'Hospitality Solutions',
    description: 'Tailored flooring for hotels, lobbies, corridors, and banquet halls.',
    image:
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2070&auto=format&fit=crop',
    href: '/services/hospitality',
  },
]

export const ServicesGrid = () => {
  return (
    <section className="py-32 bg-brand-offwhite" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs block mb-4">
              Premium Specialties
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-tight font-outfit">
              Mastering the Art <br />
              <span className="text-gray-400">of Flooring.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="group flex items-center text-secondary font-bold uppercase tracking-widest text-xs border-b border-primary/20 pb-2 hover:border-primary transition-all duration-300"
          >
            Explore All Services
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <Link
                href={service.href}
                className="group block group relative h-[500px] overflow-hidden"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0 shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 transition-transform duration-500 transform group-hover:-translate-y-4">
                  <h3 className="text-3xl font-bold text-white mb-4 font-outfit tracking-tighter">
                    {service.title}
                  </h3>
                  <p className="text-brand-offwhite/70 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-sm">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
                    View Project Details
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
