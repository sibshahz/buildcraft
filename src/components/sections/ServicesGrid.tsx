'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    title: 'Wall-to-Wall Carpets',
    description:
      'Bespoke full-room carpeting for high-traffic luxury environments and prestigious residences.',
    image:
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=2070&auto=format&fit=crop',
    href: '/services/wall-to-wall',
    category: 'Premium Softcover',
  },
  {
    title: 'Mosque Carpets',
    description:
      'Spiritual excellence through durable, comfortable, and beautifully intricate prayer carpets.',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
    href: '/services/mosque-carpets',
    category: 'Heritage',
  },
  {
    title: 'Hospitality Collections',
    description:
      'World-class flooring solutions tailored for the global luxury hospitality sector of the UAE.',
    image:
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2070&auto=format&fit=crop',
    href: '/services/hospitality',
    category: 'Commercial',
  },
  {
    title: 'SPC LVT Flooring',
    description:
      'Rigid core flooring engineered for high-performance durability with a master-crafted wood aesthetic.',
    image:
      'https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?q=80&w=2070&auto=format&fit=crop',
    href: '/services/spc-lvt',
    category: 'Architectural',
  },
  {
    title: 'Custom Area Rugs',
    description:
      'Statement pieces hand-carved to define character and luxury in sophisticated interiors.',
    image:
      'https://images.unsplash.com/photo-1579656335342-fdf4678126c1?q=80&w=2070&auto=format&fit=crop',
    href: '/services/rugs',
    category: 'Bespoke',
  },
  {
    title: 'Exquisite Carpet Tiles',
    description:
      'Modular efficiency meets luxury design for corporate headquarters and modern offices.',
    image:
      'https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?q=80&w=2070&auto=format&fit=crop',
    href: '/services/carpet-tiles',
    category: 'Corporate',
  },
  {
    title: 'Outdoor & Transit Mats',
    description: 'Functional elegance for elite entrances and high-traffic outdoor transit areas.',
    image:
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=2070&auto=format&fit=crop',
    href: '/services/outdoor-mats',
    category: 'Utility',
  },
  {
    title: 'Professional Kitchen Mats',
    description: 'Advanced ergonomic and safety solutions for premium hospitality kitchens.',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop',
    href: '/services/kitchen-mats',
    category: 'Specialized',
  },
]

export const ServicesGrid = () => {
  return (
    <section className="py-24 md:py-40 bg-sand" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col mb-24 max-w-3xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-10 h-[1px] bg-gold" />
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
              Our Expertise
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-royal leading-tight">
            Comprehensive <br />
            <span className="italic font-light">Flooring Masterpieces.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col"
            >
              <Link
                href={service.href}
                className="relative aspect-[4/5] overflow-hidden mb-8 bg-pearl"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0 shadow-xl"
                />
                {/* Decorative Frame Overlay */}
                <div className="absolute inset-0 border-[0px] group-hover:border-[12px] border-royal/10 transition-all duration-700 pointer-events-none" />

                {/* Reveal Arrow */}
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                  <ArrowUpRight className="w-6 h-6 text-royal" />
                </div>
              </Link>

              <div className="flex flex-col">
                <span className="text-gold font-bold uppercase tracking-widest text-[9px] mb-3">
                  {service.category}
                </span>
                <h3 className="text-2xl font-serif text-royal mb-4 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-royal/60 text-sm leading-relaxed font-light line-clamp-2">
                  {service.description}
                </p>

                <div className="mt-6 w-0 group-hover:w-full h-[1px] bg-gold/30 transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 pt-16 border-t border-royal/5 flex justify-center">
          <Link href="/services" className="group flex flex-col items-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-royal/40 group-hover:text-gold transition-colors">
              Discover the Full Portfolio
            </span>
            <div className="w-12 h-12 rounded-full border border-royal/10 flex items-center justify-center group-hover:bg-royal group-hover:border-royal transition-all duration-500">
              <ArrowUpRight className="w-5 h-5 text-royal group-hover:text-gold" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
