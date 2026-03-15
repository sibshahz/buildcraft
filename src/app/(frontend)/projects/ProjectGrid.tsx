'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Maximize2 } from 'lucide-react'
import { Project, Industry, Media } from '@/payload-types'

interface ProjectGridProps {
  projects: Project[]
  industries: Industry[]
}

export const ProjectGrid = ({ projects, industries }: ProjectGridProps) => {
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...industries.map((i) => i.title)]

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => (p.category as Industry)?.title === filter)

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-x-12 gap-y-10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs uppercase font-bold tracking-widest pb-2 border-b-2 transition-all duration-300 ${
                filter === cat
                  ? 'text-primary border-primary'
                  : 'text-secondary/40 border-transparent hover:text-secondary hover:border-secondary/20'
              }`}
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

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const imageUrl = (project.featuredImage as Media)?.url || ''
            const industryTitle = (project.category as Industry)?.title || 'Uncategorized'

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="group relative h-[450px] overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:border-primary transition-all duration-500 border border-secondary/5 p-4 flex flex-col">
                  <div className="relative flex-grow overflow-hidden">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-700" />
                    <div className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-white/20 backdrop-blur-md p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="pt-8 pb-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase font-bold text-primary tracking-widest">
                        {industryTitle}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-secondary/40 tracking-widest">
                        {project.location}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold font-outfit text-secondary mb-6 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/btn flex items-center text-secondary font-bold uppercase tracking-widest text-[10px] border-b border-secondary/10 pb-1 self-start hover:border-primary transition-all duration-300"
                    >
                      Full Case Study
                      <ArrowUpRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
