import React from 'react'
import { Page } from '@/payload-types'
import { HeroBlock } from './Hero'
import { ContentBlock } from './Content'
import { ValuesBlock } from './Values'
import { QuoteBlock } from './Quote'
import { TwoColumnBlock } from './TwoColumn'
import { CTABlock } from './CTA'
import { ArchiveBlock } from './Archive'
import { StatsBlock } from './Stats'
import { ProcessBlock } from './Process'

const blockComponents: Record<string, any> = {
  hero: HeroBlock,
  content: ContentBlock,
  values: ValuesBlock,
  quote: QuoteBlock,
  twoColumn: TwoColumnBlock,
  cta: CTABlock,
  archive: ArchiveBlock,
  stats: StatsBlock,
  process: ProcessBlock,
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
