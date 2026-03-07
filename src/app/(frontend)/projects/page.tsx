'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { CTASection } from '@/components/sections/CTASection'
import { ArrowUpRight, Search, PlusCircle, Maximize2 } from 'lucide-react'
import Link from 'next/link'

const categories = ['All', 'Hospitality', 'Residential', 'Corporate', 'Religious', 'SPC LVT']

const projects = [
  {
    title: 'Luxury Hotel Lobby',
    category: 'Hospitality',
    image:
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2000&auto=format&fit=crop',
    location: 'Dubai, UAE',
  },
  {
    title: 'Executive Office Suite',
    category: 'Corporate',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    location: 'Abu Dhabi, UAE',
  },
  {
    title: 'Modern Villa Staircase',
    category: 'Residential',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    location: 'Ajman, UAE',
  },
  {
    title: 'Grand Mosque Prayer Hall',
    category: 'Religious',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
    location: 'Sharjah, UAE',
  },
  {
    title: 'Premium Retail Showroom',
    category: 'SPC LVT',
    image:
      'https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2000&auto=format&fit=crop',
    location: 'Dubai, UAE',
  },
  {
    title: 'Hotel Corridor Carpeting',
    category: 'Hospitality',
    image:
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2070&auto=format&fit=crop',
    location: 'Abu Dhabi, UAE',
  },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All')

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative py-24 md:py-32 bg-secondary flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Our Legacy
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-outfit">
              Masterpieces in Every <br />
              <span className="text-primary font-light italic text-2xl md:text-5xl">
                Square Centimeter.
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Filter Section */}
      <section className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-x-12 gap-y-10">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-xs uppercase font-bold tracking-widest pb-2 border-b-2 transition-all duration-300 ${filter === cat ? 'text-primary border-primary' : 'text-secondary/40 border-transparent hover:text-secondary hover:border-secondary/20'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-2">
                Total Excellence
              </span>
              <span className="text-secondary font-bold text-xl font-outfit">
                {filteredProjects.length} Selected Projects
              </span>
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="group relative h-[450px] overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:border-primary transition-all duration-500 border border-secondary/5 p-4 flex flex-col">
                    <div className="relative flex-grow overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-700" />

                      <div className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-white/20 backdrop-blur-md p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="pt-8 pb-4 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase font-bold text-primary tracking-widest">
                          {project.category}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-secondary/40 tracking-widest">
                          {project.location}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold font-outfit text-secondary mb-6 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <Link
                        href="/projects"
                        className="group/btn flex items-center text-secondary font-bold uppercase tracking-widest text-[10px] border-b border-secondary/10 pb-1 self-start hover:border-primary transition-all duration-300"
                      >
                        Full Case Study
                        <ArrowUpRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
