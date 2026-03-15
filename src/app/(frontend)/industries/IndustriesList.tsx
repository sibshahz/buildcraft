'use client'

import React, { useState } from 'react'
import { Industry } from '@/payload-types'
import { IndustryCard } from './IndustryCard'
import { IndustryModal } from '@/components/sections/IndustryModal'

export const IndustriesList = ({ industries }: { industries: Industry[] }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null)

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        {industries.map((industry, index) => (
          <IndustryCard 
            key={industry.id} 
            industry={industry} 
            index={index} 
            onClick={() => setSelectedIndustry(industry)}
          />
        ))}
      </div>

      <IndustryModal 
        industry={selectedIndustry}
        isOpen={!!selectedIndustry}
        onClose={() => setSelectedIndustry(null)}
      />
    </>
  )
}
