import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Media, Industry } from '@/payload-types'
import { RichText } from '@/components/common/RichText'
import { Calendar, MapPin, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    overrideAccess: false,
  })

  const project = docs[0]

  if (!project) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-pearl pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <Image
          src={(project.featuredImage as Media)?.url || ''}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/20 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <Link 
            href="/projects" 
            className="inline-flex items-center space-x-2 text-gold font-bold uppercase tracking-widest text-[10px] mb-8 hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Portfolio</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-8 h-[1px] bg-gold" />
                <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
                  {(project.category as Industry)?.title}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tight">
                {project.title}
              </h1>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 md:flex md:flex-col gap-6 md:gap-4 pb-2">
               <div className="flex items-center space-x-3 text-white/80">
                  <User className="w-4 h-4 text-gold" />
                  <span className="text-xs uppercase tracking-wider font-medium">{project.client}</span>
               </div>
               <div className="flex items-center space-x-3 text-white/80">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-xs uppercase tracking-wider font-medium">{project.location}</span>
               </div>
               {project.completionDate && (
                 <div className="flex items-center space-x-3 text-white/80">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span className="text-xs uppercase tracking-wider font-medium">
                      {new Date(project.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                 </div>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Layout Sections */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white p-8 md:p-16 shadow-2xl space-y-20">
          {project.layout?.map((block, i) => {
            if (block.blockType === 'content' && block.content) {
              return (
                <div key={i} className="prose prose-xl prose-onyx max-w-none">
                  <RichText content={block.content} />
                </div>
              )
            }
            if (block.blockType === 'gallery' && block.images) {
              return (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {block.images.map((img, j) => (
                    <div key={j} className="relative aspect-video overflow-hidden group">
                      <Image
                        src={(img.image as Media).url || ''}
                        alt={`${project.title} detail ${j}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </main>
  )
}
