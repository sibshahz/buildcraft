import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { BlockRenderer } from '@/components/blocks'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function Page(props: PageProps) {
  const [{ slug }, payload] = await Promise.all([
    props.params,
    getPayload({ config: configPromise }),
  ])

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const page = result.docs[0]

  if (!page) {
    return notFound()
  }

  return (
    <div className="flex flex-col">
      <BlockRenderer blocks={page.layout} />
    </div>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
  })

  return pages.docs.map((page) => ({
    slug: page.slug,
  }))
}
