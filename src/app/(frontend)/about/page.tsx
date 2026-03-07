'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CTASection } from '@/components/sections/CTASection'
import { BadgeCheck, Users, Target, Shield } from 'lucide-react'

const values = [
  {
    title: 'Quality Excellence',
    description:
      'We source only the finest materials from global leaders to ensure lasting durability.',
    icon: Shield,
  },
  {
    title: 'Client Centric',
    description:
      'Every space is unique. We tailor our services to meet the specific architectural needs of our clients.',
    icon: Users,
  },
  {
    title: 'Innovative Design',
    description: 'Staying ahead of trends with modern SPC, LVT, and contemporary carpet designs.',
    icon: Target,
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative py-24 md:py-32 bg-secondary flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-fixed bg-center" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-6 block">
              About BuildCraft
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-outfit">
              Crafting Foundations <br />
              <span className="text-primary font-light italic text-3xl md:text-5xl">
                for Architectural Brilliance.
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-24 md:py-32 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8 font-outfit">
              The BuildCraft Story
            </h2>
            <div className="space-y-6 text-secondary/70 leading-relaxed text-lg font-light">
              <p>
                BuildCraft Flooring & Décor - F.Z.E is a premier UAE-based flooring solutions
                provider, licensed under the Ajman Free Zone. Since our inception, we have been
                dedicated to transforming ordinary spaces into extraordinary architectural
                statements.
              </p>
              <p>
                Under the visionary leadership of our Managing Director,{' '}
                <strong>Noshaba Muhammad</strong>, we have specialized in the supply and
                installation of high-quality carpets and premium flooring solutions across all seven
                emirates.
              </p>
              <p>
                Our expertise spans multiple industries, from the high-traffic demands of
                hospitality and corporate offices to the serene environments of mosques and luxury
                residential villas.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white shadow-sm border-l-4 border-primary">
                <h4 className="font-bold text-secondary mb-2 uppercase tracking-widest text-xs">
                  Based In
                </h4>
                <p className="text-secondary/60 text-sm">Ajman Free Zone, UAE</p>
              </div>
              <div className="p-6 bg-white shadow-sm border-l-4 border-primary">
                <h4 className="font-bold text-secondary mb-2 uppercase tracking-widest text-xs">
                  Serving
                </h4>
                <p className="text-secondary/60 text-sm">Nationwide Coverage</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] overflow-hidden group"
          >
            <Image
              src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2000&auto=format&fit=crop"
              alt="Craftsmanship"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-30 group-hover:opacity-0 transition-opacity duration-700" />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Core Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit">
              The Values that <br /> Drive BuildCraft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white/5 border border-white/5 p-10 hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-8">
                  <v.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-outfit">{v.title}</h3>
                <p className="text-brand-offwhite/50 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/MD Quote Section */}
      <section className="py-24 bg-brand-offwhite flex flex-col items-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-24 h-1 bg-primary mb-12 mx-auto" />
          <blockquote className="text-3xl md:text-4xl font-light italic text-secondary leading-snug mb-12">
            "Our mission is to provide flooring solutions that don't just cover ground, but set the
            foundation for inspiration and architectural excellence throughout the UAE."
          </blockquote>
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-bold text-secondary uppercase tracking-widest font-outfit">
              Noshaba Muhammad
            </h4>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mt-2">
              Managing Director
            </p>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <CTASection />
    </div>
  )
}
