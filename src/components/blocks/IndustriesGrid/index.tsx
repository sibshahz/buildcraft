import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { Page, Industry } from '@/payload-types'

type IndustriesGridBlockProps = Extract<Page['layout'][0], { blockType: 'industriesGrid' }>

export const IndustriesGridBlock = async (props: IndustriesGridBlockProps) => {
  const payload = await getPayload({ config: configPromise })
  
  const result = await payload.find({
    collection: 'industries',
    limit: 100,
    overrideAccess: false,
  })

  return (
    <IndustriesSection 
      heading={props.heading} 
      subheading={props.subheading} 
      industries={result.docs as Industry[]} 
    />
  )
}
