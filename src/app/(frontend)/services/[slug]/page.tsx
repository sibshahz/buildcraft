import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { RichText } from '@/components/common/RichText'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ServicePage(props: PageProps) {
  const [{ slug }, payload] = await Promise.all([
    props.params,
    getPayload({ config }),
  ])

  const { docs } = await payload.find({
    collection: 'services',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const service = docs[0]

  if (!service) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-pearl">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={(service.image as Media)?.url || ''}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-onyx/40 backdrop-blur-[2px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs bg-white/10 backdrop-blur-md px-6 py-2 border border-gold/30">
              {service.category}
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-white leading-tight mb-8">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-16">
            {service.layout?.map((block, i) => {
              if (block.blockType === 'content' && block.content) {
                return (
                  <div key={i} className="prose prose-xl prose-onyx max-w-none">
                    <RichText content={block.content} />
                  </div>
                )
              }
              if (block.blockType === 'features' && block.items) {
                return (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {block.items.map((item, j) => (
                      <div key={j} className="flex items-start space-x-4 p-6 bg-white border border-gold/10 shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0" />
                        <span className="text-onyx/80 font-medium">{item.feature}</span>
                      </div>
                    ))}
                  </div>
                )
              }
              return null
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 p-10 bg-onyx text-white rounded-sm overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-gold blur-3xl rounded-full" />
                <h3 className="text-3xl font-serif mb-6 relative z-10">Start Your Project</h3>
                <p className="text-white/70 mb-8 relative z-10 font-light">
                  Our master craftsmen are ready to bring your vision to life with precision and luxury materials.
                </p>
                <div className="space-y-4 relative z-10">
                  <Link 
                    href="/contact" 
                    className="flex items-center justify-between w-full bg-gold py-5 px-8 text-onyx font-bold uppercase tracking-widest text-xs hover:bg-gold/90 transition-all rounded-sm"
                  >
                    Request a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-center text-[10px] text-white/40 uppercase tracking-[0.2em] pt-4">
                    Based in Ajman, Serving UAE
                  </p>
                </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
