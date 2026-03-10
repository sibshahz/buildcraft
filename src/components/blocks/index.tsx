import React from 'react'
import { Page } from '@/payload-types'
import { HeroBlock } from './Hero'
import { ContentBlock } from './Content'
import { ValuesBlock } from './Values'
import { QuoteBlock } from './Quote'
import { TwoColumnBlock } from './TwoColumn'
import { CTABlock } from './CTA'

const blockComponents: Record<string, React.FC<any>> = {
  hero: HeroBlock,
  content: ContentBlock,
  values: ValuesBlock,
  quote: QuoteBlock,
  twoColumn: TwoColumnBlock,
  cta: CTABlock,
}

export const BlockRenderer: React.FC<{ blocks: Page['layout'] }> = ({ blocks }) => {
  if (!blocks) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Block = blockComponents[block.blockType]
        if (Block) {
          return <Block key={block.id || index} {...(block as any)} />
        }
        return null
      })}
    </>
  )
}
