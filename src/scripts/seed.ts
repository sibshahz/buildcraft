import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { Media, Industry, Service, Page } from '../payload-types'

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600',
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600',
  villa: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600',
  mosque: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1600',
  shop: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600',
  flooring1: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=1600',
  flooring2: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1600',
  logo: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600',
}

async function uploadImage(payload: any, url: string, alt: string, filename: string): Promise<Media> {
  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } }
  })

  if (existingMedia.totalDocs > 0) return existingMedia.docs[0]

  console.log(`Uploading: ${alt}...`)
  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  return await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      name: `${filename}.jpg`,
      mimetype: 'image/jpeg',
      size: buffer.length,
    },
  })
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding industries...')
  const industryData = [
    { title: 'Hotels & Hospitality', slug: 'hospitality', icon: 'hotel', description: 'Transforming world-class hotel environments with high-traffic luxury carpeting and flooring.', image: IMAGES.hotel },
    { title: 'Corporate Offices', slug: 'corporate', icon: 'office', description: 'Bespoke modular flooring designed for productivity and prestigious corporate identity.', image: IMAGES.office },
    { title: 'Villas & Residential', slug: 'residential', icon: 'villa', description: 'Tailored luxury for private Emirati villas, combining comfort with elite architectural design.', image: IMAGES.villa },
    { title: 'Mosques & Prayer', slug: 'mosques', icon: 'mosque', description: 'Durable and spiritually inspired carpeting for sacred community and prayer facilities.', image: IMAGES.mosque },
    { title: 'Commercial Retail', slug: 'retail', icon: 'shop', description: 'High-durability SPC and LVT solutions for luxury brand outlets and retail fit-outs.', image: IMAGES.shop },
    { title: 'Institutional Projects', slug: 'institutional', icon: 'graduation', description: 'Safe, sustainable, and professional-grade flooring for regional public and educational institutions.', image: IMAGES.office },
  ]

  for (const item of industryData) {
    const media = await uploadImage(payload, item.image, item.title, item.slug)
    const existing = await payload.find({ collection: 'industries', where: { slug: { equals: item.slug } } })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'industries',
        data: { title: item.title, slug: item.slug, icon: item.icon as any, description: item.description, bannerImage: media.id }
      })
    }
  }

  console.log('Seeding services...')
  const serviceData = [
    { title: 'Wall-to-Wall Carpets', slug: 'wall-to-wall', category: 'Premium Softcover', description: 'Bespoke full-room carpeting for high-traffic luxury environments.', image: IMAGES.flooring2 },
    { title: 'Mosque Carpets', slug: 'mosque-carpets', category: 'Heritage', description: 'Spiritual excellence through durable and beautifully intricate prayer carpets.', image: IMAGES.mosque },
    { title: 'Hospitality Collections', slug: 'hospitality', category: 'Commercial', description: 'World-class flooring solutions tailored for the global luxury hospitality sector.', image: IMAGES.hotel },
    { title: 'SPC LVT Flooring', slug: 'spc-lvt', category: 'Architectural', description: 'Rigid core flooring engineered for high-performance durability.', image: IMAGES.flooring1 },
    { title: 'Custom Area Rugs', slug: 'rugs', category: 'Bespoke', description: 'Statement pieces hand-carved to define character and luxury.', image: IMAGES.flooring2 },
    { title: 'Exquisite Carpet Tiles', slug: 'carpet-tiles', category: 'Corporate', description: 'Modular efficiency meets luxury design for corporate headquarters.', image: IMAGES.office },
    { title: 'Outdoor & Transit Mats', slug: 'outdoor-mats', category: 'Utility', description: 'Functional elegance for elite entrances and outdoor transit areas.', image: IMAGES.flooring1 },
    { title: 'Professional Kitchen Mats', slug: 'kitchen-mats', category: 'Specialized', description: 'Advanced ergonomic and safety solutions for premium kitchens.', image: IMAGES.office },
  ]

  for (const item of serviceData) {
    const media = await uploadImage(payload, item.image, item.title, item.slug)
    const existing = await payload.find({ collection: 'services', where: { slug: { equals: item.slug } } })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'services',
        data: { title: item.title, slug: item.slug, category: item.category, description: item.description, image: media.id }
      })
    }
  }

  console.log('Seeding home page...')
  const heroMedia = await uploadImage(payload, IMAGES.hero, 'Home Hero', 'home-hero')
  
  await payload.delete({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      layout: [
        {
          blockType: 'hero',
          heading: 'Refining Elite Spaces with Master-Crafted Flooring.',
          subheading: 'BuildCraft Legacy: Over a decade of excellence in luxury carpeting and architectural flooring across the UAE and beyond.',
          backgroundImage: heroMedia.id
        },
        {
          blockType: 'servicesGrid',
          heading: 'Comprehensive Flooring Masterpieces.',
          subheading: 'Our Expertise'
        },
        {
          blockType: 'about',
          subheading: 'The BuildCraft Legacy',
          heading: 'Regional Expertise. Global Quality.',
          content: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'BuildCraft Flooring & Décor stands as a testament to Emirati reliability and architectural excellence. We represent the pinnacle of flooring solutions across the seven emirates.',
                      type: 'text',
                      version: 1
                    }
                  ]
                },
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'From the high-traffic corridors of luxury UAE hotels to the serene environments of local mosques and private royal villas, our commitment to premium installation quality remains unparalleled.',
                      type: 'text',
                      version: 1
                    }
                  ]
                }
              ]
            }
          } as any,
          image: heroMedia.id,
          stats: [
            { value: '07', label: 'Emirates Served' },
            { value: '100+', label: 'Elite Projects' }
          ]
        },
        {
          blockType: 'stats',
          stats: [
            { value: '07', label: 'Emirates Covered' },
            { value: '100+', label: 'Prestigious Projects' },
            { value: 'Premium', label: 'Material Grading' },
            { value: 'Ajman', label: 'Based Heritage' }
          ]
        },
        {
          blockType: 'industriesGrid',
          heading: 'Industries We Elevate.',
          subheading: 'Strategic Partners'
        },
        {
          blockType: 'cta',
          heading: 'Ready to Transform Your Space?',
          subheading: 'Contact our master craftsmen today for a private consultation.',
          buttonText: 'Request a Quote',
          buttonLink: '/contact'
        }
      ]
    }
  })

  console.log('Seeding site settings...')
  const logoMedia = await uploadImage(payload, IMAGES.logo, 'BuildCraft Logo', 'logo')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      logo: logoMedia.id,
      phone: '+971 4 123 4567',
      email: 'info@buildcraft.ae',
      address: 'Office 101, Business Center, Al Quoz 3, Dubai, UAE',
      mdName: 'Noshaba Muhammad',
      mdTitle: 'Managing Director',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/buildcraft' },
        { platform: 'facebook', url: 'https://facebook.com/buildcraft' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/buildcraft' },
        { platform: 'whatsapp', url: 'https://wa.me/971501234567' },
      ],
      copyright: '© 2024 BuildCraft Flooring & Décor - F.Z.E. All rights reserved.',
    },
  })

  console.log('Seeding completed!')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
