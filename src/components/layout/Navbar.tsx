'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 bg-white py-4 shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-secondary transition-colors duration-300">
            BuildCraft
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary transition-colors duration-300">
            Flooring & Décor
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            href="/contact"
            className="bg-primary text-white px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-primary-dark transition-all duration-300 shadow-md"
          >
            Request Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 focus:outline-none transition-colors duration-300 text-secondary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] lg:hidden flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-16">
              <Link href="/" className="flex flex-col" onClick={() => setIsOpen(false)}>
                <span className="text-2xl font-bold tracking-tight text-secondary">BuildCraft</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary">
                  Flooring & Décor
                </span>
              </Link>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-8 h-8 text-secondary" />
              </button>
            </div>

            <nav className="flex flex-col space-y-8 mb-16">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-bold text-secondary hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col space-y-6">
              <div className="flex items-center space-x-4 text-secondary/70">
                <Phone className="w-5 h-5" />
                <span className="text-sm font-medium">+971 56 496 1186</span>
              </div>
              <div className="flex items-center space-x-4 text-secondary/70">
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">sales@buildcraftflooring.ae</span>
              </div>
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                <a
                  href="https://instagram.com/buildcraftflooring"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
