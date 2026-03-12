import React from 'react'
import { Page } from '@/payload-types'
import dynamic from 'next/dynamic'

const HeroBlock = dynamic(() => import('./Hero').then(mod => mod.HeroBlock))
const ContentBlock = dynamic(() => import('./Content').then(mod => mod.ContentBlock))
const ValuesBlock = dynamic(() => import('./Values').then(mod => mod.ValuesBlock))
const QuoteBlock = dynamic(() => import('./Quote').then(mod => mod.QuoteBlock))
const TwoColumnBlock = dynamic(() => import('./TwoColumn').then(mod => mod.TwoColumnBlock))
const CTABlock = dynamic(() => import('./CTA').then(mod => mod.CTABlock))
const ArchiveBlock = dynamic(() => import('./Archive').then(mod => mod.ArchiveBlock))
const StatsBlock = dynamic(() => import('./Stats').then(mod => mod.StatsBlock))
const ProcessBlock = dynamic(() => import('./Process').then(mod => mod.ProcessBlock))

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
