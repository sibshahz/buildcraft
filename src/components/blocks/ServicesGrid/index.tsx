import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { Page, Service } from '@/payload-types'

type ServicesGridBlockProps = Extract<Page['layout'][0], { blockType: 'servicesGrid' }>

export const ServicesGridBlock = async (props: ServicesGridBlockProps) => {
  const payload = await getPayload({ config: configPromise })
  
  const result = await payload.find({
    collection: 'services',
    limit: 100,
    overrideAccess: false,
  })

  return (
    <ServicesGrid 
      heading={props.heading} 
      subheading={props.subheading} 
      services={result.docs as Service[]} 
    />
  )
}
