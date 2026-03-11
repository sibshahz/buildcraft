import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { Media, Industry, Project, Service, SiteSetting } from '../payload-types'

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
  // Check if media already exists
  const existingMedia = await payload.find({
    collection: 'media',
    where: {
      alt: { equals: alt }
    }
  })

  if (existingMedia.totalDocs > 0) {
    console.log(`Media already exists: ${alt}`)
    return existingMedia.docs[0]
  }

  console.log(`Downloading and uploading image: ${filename}...`)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`)
  }
  
  const contentType = response.headers.get('content-type') || 'image/jpeg'
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  return await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      name: `${filename}.${contentType.split('/')[1] || 'jpg'}`,
      mimetype: contentType,
      size: buffer.length,
    },
  })
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  // 1. Create Media
  const logoMedia = await uploadImage(payload, IMAGES.logo, 'BuildCraft Logo', 'logo')
  const heroMedia = await uploadImage(payload, IMAGES.hero, 'Modern Flooring Hero', 'hero-flooring')
  const officeMedia = await uploadImage(payload, IMAGES.office, 'Modern Office Space', 'office')
  const hotelMedia = await uploadImage(payload, IMAGES.hotel, 'Luxury Hotel Lobby', 'hotel')
  const villaMedia = await uploadImage(payload, IMAGES.villa, 'Luxury Villa Interior', 'villa')
  const mosqueMedia = await uploadImage(payload, IMAGES.mosque, 'Ornate Mosque Interior', 'mosque')
  const shopMedia = await uploadImage(payload, IMAGES.shop, 'Modern Retail Store', 'shop')
  const floor1 = await uploadImage(payload, IMAGES.flooring1, 'Hardwood Flooring', 'flooring-1')
  const floor2 = await uploadImage(payload, IMAGES.flooring2, 'Carpet Flooring', 'flooring-2')

  // 2. Seed Industries
  console.log('Seeding Industries...')
  const industryTitles = ['Hotels & Resorts', 'Commercial Offices', 'Residential Villas', 'Religious Spaces', 'Retail & Showrooms']
  
  const industries = await Promise.all(industryTitles.map(async (title, index) => {
    const existing = await payload.find({
      collection: 'industries',
      where: { title: { equals: title } }
    })
    
    if (existing.totalDocs > 0) return existing.docs[0] as Industry

    const data: any = [
      {
        title: 'Hotels & Resorts',
        icon: 'hotel',
        description: 'Premium flooring solutions for the hospitality industry, ensuring durability and luxury.',
        bannerImage: hotelMedia.id,
      },
      {
        title: 'Commercial Offices',
        icon: 'office',
        description: 'Modern and functional flooring for productive workspace environments.',
        bannerImage: officeMedia.id,
      },
      {
        title: 'Residential Villas',
        icon: 'villa',
        description: 'Elegant and durable flooring options for high-end residential projects.',
        bannerImage: villaMedia.id,
      },
      {
        title: 'Religious Spaces',
        icon: 'mosque',
        description: 'Specially designed carpets and flooring for mosques and community centers.',
        bannerImage: mosqueMedia.id,
      },
      {
        title: 'Retail & Showrooms',
        icon: 'shop',
        description: 'High-traffic flooring solutions that combine aesthetics with maximum durability.',
        bannerImage: shopMedia.id,
      },
    ]

    return await payload.create({
      collection: 'industries',
      data: data[index],
    }) as Industry
  }))

  // 3. Seed Services
  console.log('Seeding Services...')
  const serviceTitles = ['Hardwood Flooring', 'Luxury Carpets']
  await Promise.all(serviceTitles.map(async (title, index) => {
    const existing = await payload.find({
      collection: 'services',
      where: { title: { equals: title } }
    })
    if (existing.totalDocs > 0) return

    const data = [
      {
        title: 'Hardwood Flooring',
        description: 'Premium genuine wood and engineered wood flooring installations for a timeless look.',
        image: floor1.id,
        features: [
          { feature: 'Natural Oak and Walnut options' },
          { feature: 'Multi-layer construction for stability' },
          { feature: 'Professional installation guaranteed' },
        ],
      },
      {
        title: 'Luxury Carpets',
        description: 'High-quality wall-to-wall carpets and area rugs for comfort and acoustics.',
        image: floor2.id,
        features: [
          { feature: 'Stain-resistant fibers' },
          { feature: 'Wide range of textures and patterns' },
          { feature: 'Ideal for hotels and offices' },
        ],
      },
    ]

    await payload.create({
      collection: 'services',
      data: data[index],
    })
  }))

  // 4. Seed Projects
  console.log('Seeding Projects...')
  const projectTitles = ['Burj View Office Suite', 'Palm Jumeirah Villa']
  await Promise.all(projectTitles.map(async (title, index) => {
    const existing = await payload.find({
      collection: 'projects',
      where: { title: { equals: title } }
    })
    if (existing.totalDocs > 0) return

    const data = [
      {
        title: 'Burj View Office Suite',
        client: 'TechGlobal Corp',
        location: 'Business Bay, Dubai',
        completionDate: new Date('2023-11-15').toISOString(),
        category: industries[1].id,
        featuredImage: officeMedia.id,
        gallery: [
          { image: floor1.id },
          { image: officeMedia.id },
        ],
      },
      {
        title: 'Palm Jumeirah Villa',
        client: 'Private Client',
        location: 'Palm Jumeirah, Dubai',
        completionDate: new Date('2024-01-20').toISOString(),
        category: industries[2].id,
        featuredImage: villaMedia.id,
        gallery: [
          { image: villaMedia.id },
          { image: floor2.id },
        ],
      },
    ]

    await payload.create({
      collection: 'projects',
      data: data[index],
    })
  }))

  // 5. Seed Site Settings
  console.log('Seeding Site Settings...')
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

  console.log('Seeding completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error seeding database:', err)
  process.exit(1)
})
