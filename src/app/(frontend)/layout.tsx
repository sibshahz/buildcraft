import React from 'react'
import { Inter, Outfit, Cormorant_Garamond } from 'next/font/google'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SiteSettingsProvider } from '@/providers/SiteSettingsContext'
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

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return {
    description:
      siteSettings.meta?.description ||
      'Premium flooring solutions in UAE - carpets, tiles, and LVT flooring for hospitality, offices, and residential spaces.',
    title: {
      template: '%s | BuildCraft Flooring & Décor',
      default: siteSettings.meta?.title || 'BuildCraft Flooring & Décor | Premium Flooring Solutions UAE',
    },
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title: siteSettings.meta?.title || 'BuildCraft Flooring & Décor',
      description: siteSettings.meta?.description || 'Premium flooring solutions in UAE',
      images: siteSettings.meta?.image
        ? [
            {
              url: (siteSettings.meta.image as any).url || '/og-image.jpg',
            },
          ]
        : [],
    },
  }
}

export const revalidate = 60 // Revalidate pages every 60 seconds (ISR)

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload({ config: configPromise })
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-secondary bg-[#FAF7F2] selection:bg-primary/30 selection:text-secondary">
        <SiteSettingsProvider settings={siteSettings}>
          <Navbar settings={siteSettings} />
          <main className="min-h-screen">{children}</main>
          <Footer settings={siteSettings} />
        </SiteSettingsProvider>
      </body>
    </html>
  )
}
