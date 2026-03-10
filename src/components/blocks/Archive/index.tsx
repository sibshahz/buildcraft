import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Page, Media, Service, Project, Industry } from '@/payload-types'

type ArchiveProps = Extract<Page['layout'][0], { blockType: 'archive' }>

export const ArchiveBlock = async ({ heading, subheading, collection, limit }: ArchiveProps) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: collection as any,
    limit: limit || 6,
    sort: '-createdAt',
  })

  const docs = result.docs

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {(heading || subheading) && (
          <div className="mb-16">
            {heading && (
              <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6 font-outfit uppercase tracking-tight">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-secondary/60 text-lg leading-relaxed max-w-2xl">{subheading}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {docs.map((doc: any, index: number) => {
            const title = doc.title
            const image = doc.image || doc.featuredImage || doc.bannerImage
            const imageUrl = (image as Media)?.url
            const description = doc.description || doc.client

            return (
              <div key={doc.id || index} className="group flex flex-col">
                <div className="relative h-[300px] overflow-hidden mb-8">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-secondary/10 group-hover:bg-secondary/0 transition-colors duration-500" />
                  <div className="absolute bottom-6 right-6 bg-primary p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-secondary mb-4 font-outfit group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-secondary/60 line-clamp-2 mb-6 font-light">{description}</p>
                  )}
                  <Link
                    href={`/${collection}/${doc.slug || doc.id}`}
                    className="mt-auto text-[10px] font-bold uppercase tracking-widest text-primary border-b border-primary/20 self-start pb-1 hover:border-primary transition-all"
                  >
                    Explore More
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
