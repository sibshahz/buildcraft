import React from 'react'
import { Inter, Outfit, Cormorant_Garamond } from 'next/font/google'
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

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  style: 'italic',
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
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-secondary bg-[#FAF7F2] selection:bg-primary/30 selection:text-secondary">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
