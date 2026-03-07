import React from 'react'
import { Inter, Outfit } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata = {
  description:
    'Premium flooring solutions in UAE - carpets, tiles, and LVT flooring for hospitality, offices, and residential spaces.',
  title: {
    template: '%s | BuildCraft Flooring & Décor',
    default: 'BuildCraft Flooring & Décor | Premium Flooring Solutions UAE',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-secondary selection:bg-primary/30 selection:text-secondary">
        <Navbar />
        <main className="min-h-screen bg-brand-offwhite pt-[73px] md:pt-[81px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
