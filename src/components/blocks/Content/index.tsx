import { Page } from '@/payload-types'
import { RichText } from '@/components/common/RichText'

type ContentProps = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlock: React.FC<ContentProps> = ({ content }) => {
  return (
    <section className="py-24 md:py-32 bg-brand-offwhite">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <RichText
          content={content}
          className="prose prose-lg prose-onyx max-w-none text-secondary/70 leading-relaxed text-lg font-light"
        />
      </div>
    </section>
  )
}
