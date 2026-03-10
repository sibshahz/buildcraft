'use client'

import React, { createContext, useContext } from 'react'
import type { SiteSetting } from '@/payload-types'

const SiteSettingsContext = createContext<SiteSetting | undefined>(undefined)

export const SiteSettingsProvider = ({
  children,
  settings,
}: {
  children: React.ReactNode
  settings: SiteSetting
}) => {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>
}

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext)
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider')
  }
  return context
}
