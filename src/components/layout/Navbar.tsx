'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram } from 'lucide-react'
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full transition-all duration-700 px-6 md:px-12 z-[100]',
          scrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md py-4 shadow-xl border-b border-gold/20'
            : 'bg-transparent py-8',
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col">
            <span
              className={cn(
                'text-2xl md:text-3xl font-serif tracking-tight transition-colors duration-500',
                scrolled ? 'text-royal' : 'text-white',
              )}
            >
              BuildCraft
            </span>
            <span
              className={cn(
                'text-[9px] uppercase tracking-[0.4em] font-bold transition-colors duration-500',
                scrolled ? 'text-gold' : 'text-gold/90',
              )}
            >
              Ajman • UAE
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 relative group',
                  scrolled ? 'text-royal hover:text-gold' : 'text-white/90 hover:text-white',
                )}
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className={cn(
                'px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 border',
                scrolled
                  ? 'bg-royal text-sand border-royal hover:bg-gold hover:border-gold'
                  : 'bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white hover:text-royal',
              )}
            >
              Inquire Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              'lg:hidden p-2 transition-colors duration-500',
              scrolled ? 'text-royal' : 'text-white',
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8 font-light" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-royal z-[110] lg:hidden flex flex-col p-12 overflow-y-auto"
          >
            {/* Decorative Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/examples/music-dark.png')] bg-repeat" />

            <div className="flex justify-between items-center mb-20 relative z-10">
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-sand">BuildCraft</span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold mt-1">
                  Flooring & Décor
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 border border-sand/20 flex items-center justify-center rounded-full hover:bg-sand/10 transition-colors"
              >
                <X className="w-6 h-6 text-sand" />
              </button>
            </div>

            <nav className="flex flex-col space-y-10 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    className="text-5xl font-serif italic text-sand hover:text-gold transition-colors block"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col space-y-8 relative z-10 pt-10 border-t border-sand/10">
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-sand/40 font-bold">
                  Liaise With Us
                </span>
                <a
                  href="tel:+971564961186"
                  className="text-xl text-sand hover:text-gold transition-colors"
                >
                  +971 56 496 1186
                </a>
              </div>
              <div className="flex items-center space-x-6">
                <a
                  href="https://instagram.com/buildcraftflooring"
                  className="text-sand border border-sand/20 p-3 rounded-full hover:bg-gold hover:border-gold transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
