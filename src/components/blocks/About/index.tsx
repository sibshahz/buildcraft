import React from 'react'
import { AboutSection } from '@/components/sections/AboutSection'
import { Page } from '@/payload-types'

type AboutBlockProps = Extract<Page['layout'][0], { blockType: 'about' }>

export const AboutBlock: React.FC<AboutBlockProps> = (props) => {
  return (
    <AboutSection 
      subheading={props.subheading}
      heading={props.heading}
      content={props.content}
      image={props.image}
      stats={props.stats}
    />
  )
}
