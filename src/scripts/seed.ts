import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { Media } from '../payload-types'

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

const generateLexicalContent = (text: string): any => {
  const paragraphs = text.split('\n\n').filter((p) => p.trim() !== '')

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((p) => ({
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
            text: p,
            type: 'text',
            version: 1,
          },
        ],
      })),
    },
  }
}

async function uploadImage(
  payload: any,
  url: string,
  alt: string,
  filename: string,
): Promise<Media> {
  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
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
    {
      title: 'Hotels & Hospitality',
      slug: 'hospitality',
      icon: 'hotel',
      description:
        'Transforming world-class hotel environments with high-traffic luxury carpeting and flooring.',
      longDescription: generateLexicalContent(
        'Our hospitality solutions focus on creating unforgettable guest experiences through premium textures and acoustic comfort. We have worked with major hotel chains in Dubai and Abu Dhabi, providing everything from entrance matting to presidential suite wall-to-wall luxury carpets. Our team ensures rapid installation during low-occupancy periods to minimize business disruption.',
      ),
      image: IMAGES.hotel,
    },
    {
      title: 'Corporate Offices',
      slug: 'corporate',
      icon: 'office',
      description:
        'Bespoke modular flooring designed for productivity and prestigious corporate identity.',
      longDescription: generateLexicalContent(
        'Modern corporate environments demand flexible, durable, and stylish flooring. Our modular carpet tiles allow for easy maintenance and access to underfloor cabling, while our LVT solutions provide a high-end look for receptions and boardrooms. We provide sound-dampening materials that significantly improve office productivity and employee well-being.',
      ),
      image: IMAGES.office,
    },
    {
      title: 'Villas & Residential',
      slug: 'residential',
      icon: 'villa',
      description:
        'Tailored luxury for private Emirati villas, combining comfort with elite architectural design.',
      longDescription: generateLexicalContent(
        'For private residences, BuildCraft offers exclusivity and comfort. Our residential collection includes hand-tufted rugs, silk-blend carpets, and premium wood flooring. We work closely with interior designers to match your personal style with the highest quality materials available on the global market.',
      ),
      image: IMAGES.villa,
    },
    {
      title: 'Mosques & Prayer',
      slug: 'mosques',
      icon: 'mosque',
      description:
        'Durable and spiritually inspired carpeting for sacred community and prayer facilities.',
      longDescription: generateLexicalContent(
        'Spiritual spaces require careful consideration of both aesthetics and durability. Our mosque carpets are designed with high-density fibers to withstand heavy use while maintaining their softness and intricate patterns. We provide custom alignments and designs that respect traditional values while incorporating modern durability standards.',
      ),
      image: IMAGES.mosque,
    },
    {
      title: 'Commercial Retail',
      slug: 'retail',
      icon: 'shop',
      description:
        'High-durability SPC and LVT solutions for luxury brand outlets and retail fit-outs.',
      longDescription: generateLexicalContent(
        'Retail flooring must reflect brand prestige while enduring high footfall. Our SPC and LVT floors are scratch-resistant, water-proof, and available in hundreds of finishes from natural wood to industrial stone. We specialize in rapid overnight installations for malls and high-street shops across the Emirates.',
      ),
      image: IMAGES.shop,
    },
    {
      title: 'Institutional Projects',
      slug: 'institutional',
      icon: 'graduation',
      description:
        'Safe, sustainable, and professional-grade flooring for regional public and educational institutions.',
      longDescription: generateLexicalContent(
        'Education and public sector projects prioritize safety, hygiene, and longevity. Our slip-resistant and easy-to-clean flooring solutions meet all UAE safety regulations. We provide specialized coatings and materials that resist bacterial growth, making them ideal for schools, clinics, and government offices.',
      ),
      image: IMAGES.office,
    },
  ]

  for (const item of industryData) {
    const media = await uploadImage(payload, item.image, item.title, item.slug)
    await payload.delete({ collection: 'industries', where: { slug: { equals: item.slug } } })
    await payload.create({
      collection: 'industries',
      data: {
        title: item.title,
        slug: item.slug,
        icon: item.icon as any,
        description: item.description,
        longDescription: item.longDescription as any,
        bannerImage: media.id,
      },
    })
  }

  console.log('Seeding services...')
  const serviceData = [
    {
      title: 'Wall-to-Wall Carpets',
      slug: 'wall-to-wall',
      category: 'Premium Softcover',
      description: 'Bespoke full-room carpeting for high-traffic luxury environments.',
      content: generateLexicalContent(
        'Our wall-to-wall carpeting solutions represent the ultimate in comfort and luxury. Available in a vast array of materials, from pure wool to high-performance synthetic fibers, our carpets are designed to enhance the acoustics and atmosphere of any room.\n\n' +
          'We understand that every space has unique requirements. Whether you are seeking the plush feel of a luxury hotel suite or the durable performance needed for a busy corporate corridor, our expert consultants will guide you through our extensive portfolio of textures, patterns, and pile heights.\n\n' +
          'Our commitment to excellence extends beyond the product itself. We offer professional site measurement, sub-floor preparation, and precision installation by our team of master craftsmen, ensuring a seamless finish that stands the test of time.',
      ),
      features: [
        { feature: 'High-density acoustic insulation' },
        { feature: 'Stain-resistant fiber technology' },
        { feature: 'Customizable patterns and colors' },
        { feature: 'Professional power-stretch installation' },
      ],
      image: IMAGES.flooring2,
    },
    {
      title: 'Mosque Carpets',
      slug: 'mosque-carpets',
      category: 'Heritage',
      description: 'Spiritual excellence through durable and beautifully intricate prayer carpets.',
      content: generateLexicalContent(
        'BuildCraft is a leader in providing spiritual spaces with high-quality prayer carpeting. Our mosque carpets are woven with the finest yarns to ensure longevity and comfort during prayer, reflecting the importance of these sacred communal spaces.\n\n' +
          'We offer both traditional and contemporary designs that can be customized with specific mosque logos, mihrab patterns, or color palettes. Our deep understanding of Islamic geometric art allows us to create carpets that are spiritually inspiring and architecturally integrated.\n\n' +
          'Durability is at the core of our mosque collection. Using high-twist heat-set technology, our carpets maintain their structural integrity and vibrant colors even in the highest traffic environments, accompanied by antimicrobial treatments for hygiene.',
      ),
      features: [
        { feature: 'Antimicrobial and anti-fungal treatment' },
        { feature: 'Integrated prayer line (Saf) alignment' },
        { feature: 'Flame-retardant safety certification' },
        { feature: 'Deep-pile comfort for extended prayer' },
      ],
      image: IMAGES.mosque,
    },
    {
      title: 'Hospitality Collections',
      slug: 'hospitality',
      category: 'Commercial',
      description:
        'World-class flooring solutions tailored for the global luxury hospitality sector.',
      content: generateLexicalContent(
        'The hospitality sector requires a perfect balance of aesthetics and functionality. Our hospitality collection includes heavy-duty carpets, elegant LVT, and durable rugs designed to withstand the rigors of hotel entrances, corridors, and ballrooms.\n\n' +
          'We work closely with architects and interior designers to deliver flooring that tells a brand story. From the moment a guest steps into the lobby to their private time in a suite, our products provide the sensory cues of quality and care that define world-class hosting.\n\n' +
          'Beyond the product, we provide complete turnkey solutions. This includes design consulting, logistics management for large-scale projects, and rapid overnight installation services to ensure that guest operations are never compromised.',
      ),
      features: [
        { feature: 'Heavy-duty commercial wear rating' },
        { feature: 'Sound-dampening for quiet corridors' },
        { feature: 'Sustainability certified (LEED compliant)' },
        { feature: 'Easy-maintenance fiber systems' },
      ],
      image: IMAGES.hotel,
    },
    {
      title: 'SPC LVT Flooring',
      slug: 'spc-lvt',
      category: 'Architectural',
      description: 'Rigid core flooring engineered for high-performance durability.',
      content: generateLexicalContent(
        'Stone Plastic Composite (SPC) and Luxury Vinyl Tile (LVT) represent the future of architectural flooring. These materials offer the beauty of natural wood or stone with 100% waterproof performance and superior scratch resistance.\n\n' +
          'Our SPC collection features a rigid core that provides exceptional stability even when exposed to temperature fluctuations, making it ideal for the UAE climate. LVT offers incredible design flexibility, with photorealistic layers that are indistinguishable from natural materials.\n\n' +
          'Both solutions are designed for rapid installation using advanced click-lock systems, allowing for efficient renovation of retail spaces, offices, and residential apartments with minimal downtime and environmental impact.',
      ),
      features: [
        { feature: '100% Waterproof and moisture resistant' },
        { feature: 'Scratch and indentation resistant' },
        { feature: 'Zero-formaldehyde environmental rating' },
        { feature: 'Underfloor heating compatibility' },
      ],
      image: IMAGES.flooring1,
    },
    {
      title: 'Custom Area Rugs',
      slug: 'rugs',
      category: 'Bespoke',
      description: 'Statement pieces hand-carved to define character and luxury.',
      content: generateLexicalContent(
        'Our custom area rugs are true works of art, designed to serve as the soul of an interior space. Each piece is hand-tufted or hand-woven by skilled artisans using only the finest natural materials including silk, Himalayan wool, and botanical yarns.\n\n' +
          'We offer a completely bespoke design process where your vision is translated into a technical rendering. Clients can specify every detail from pile height variations and carving techniques to subtle metallic accents that catch the light and add a layer of sophistication.\n\n' +
          'Whether intended for a private residential lounge, a corporate boardroom, or a luxury boutique, our rugs are engineered to provide a soft landing and a lasting impression of exclusivity and refined taste.',
      ),
      features: [
        { feature: 'Hand-carved 3D texture detailing' },
        { feature: 'Pure silk and New Zealand wool blends' },
        { feature: 'Available in any bespoke size or shape' },
        { feature: 'Edge-binding and non-slip finishing' },
      ],
      image: IMAGES.flooring2,
    },
    {
      title: 'Exquisite Carpet Tiles',
      slug: 'carpet-tiles',
      category: 'Corporate',
      description: 'Modular efficiency meets luxury design for corporate headquarters.',
      content: generateLexicalContent(
        'Carpet tiles offer unprecedented flexibility for modern office spaces. Our exquisite collection allows for creative mixing of patterns and colors to define zones, encourage pathways, and inject brand personality into the workplace environment.\n\n' +
          'Beyond their design flexibility, our tiles provide exceptional acoustic properties, absorbing ambient noise to create a more focused and productive workspace. They are the ideal solution for large-scale office floor plates that require frequent access to underfloor utilities.\n\n' +
          'Sustainability is a key focus of our modular range, with many tiles featuring recycled content and low-VOC emissions, contributing to a healthier indoor environment for your employees and guests.',
      ),
      features: [
        { feature: 'Modular design for easy part-replacement' },
        { feature: 'Underfloor cabling access friendly' },
        { feature: 'Low-VOC and indoor air quality certified' },
        { feature: 'High-traffic durability for pivot points' },
      ],
      image: IMAGES.office,
    },
  ]

  for (const item of serviceData) {
    const media = await uploadImage(payload, item.image, item.title, item.slug)
    await payload.delete({ collection: 'services', where: { slug: { equals: item.slug } } })
    await payload.create({
      collection: 'services',
      data: {
        title: item.title,
        slug: item.slug,
        category: item.category,
        description: item.description,
        layout: [
          {
            blockType: 'content',
            content: item.content as any,
          },
          {
            blockType: 'features',
            items: item.features,
          },
        ],
        image: media.id,
      },
    })
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
          subheading:
            'BuildCraft Legacy: Over a decade of excellence in luxury carpeting and architectural flooring across the UAE and beyond.',
          backgroundImage: heroMedia.id,
        },
        {
          blockType: 'servicesGrid',
          heading: 'Comprehensive Flooring Masterpieces.',
          subheading: 'Our Expertise',
        },
        {
          blockType: 'about',
          subheading: 'The BuildCraft Legacy',
          heading: 'Regional Expertise. Global Quality.',
          content: generateLexicalContent(
            'BuildCraft Flooring & Décor stands as a testament to Emirati reliability and architectural excellence. We represent the pinnacle of flooring solutions across the seven emirates.',
          ),
          image: heroMedia.id,
          stats: [
            { value: '07', label: 'Emirates Served' },
            { value: '100+', label: 'Elite Projects' },
          ],
        },
        {
          blockType: 'stats',
          stats: [
            { value: '07', label: 'Emirates Covered' },
            { value: '100+', label: 'Prestigious Projects' },
            { value: 'Premium', label: 'Material Grading' },
            { value: 'Ajman', label: 'Based Heritage' },
          ],
        },
        {
          blockType: 'industriesGrid',
          heading: 'Industries We Elevate.',
          subheading: 'Strategic Partners',
        },
        {
          blockType: 'cta',
          heading: 'Ready to Transform Your Space?',
          subheading: 'Contact our master craftsmen today for a private consultation.',
          buttonText: 'Request a Quote',
          buttonLink: '/contact',
        },
      ],
    },
  })

  console.log('Seeding projects...')
  const industryDocs = await payload.find({ collection: 'industries' })
  const findIndustryId = (slug: string) =>
    industryDocs.docs.find((d) => d.slug === slug)?.id || industryDocs.docs[0].id

  const projectData = [
    {
      title: 'Grand Emirates Hotel Ballroom',
      slug: 'grand-emirates-ballroom',
      client: 'Emirates Hospitality Group',
      location: 'Dubai, UAE',
      industry: 'hospitality',
      description: 'A massive 2,000 sqm luxury carpeting project for a 5-star ballroom.',
      content:
        'We were commissioned to design and install custom-woven Axminster carpets for the Grand Emirates Ballroom. The design reflects traditional Emirati patterns with a modern gold-accented twist, providing both acoustic excellence and a regal atmosphere.\n\nThe project required precision installation around circular structural columns and integrated stage flooring, completed within a tight 14-day window to accommodate scheduled international summits.',
      images: [IMAGES.hotel, IMAGES.flooring2],
    },
    {
      title: 'Global Tech HQ Offices',
      slug: 'global-tech-hq',
      client: 'TechCorp International',
      location: 'Dubai Design District',
      industry: 'corporate',
      description: 'Modern modular carpet tile installation for a high-tech work environment.',
      content:
        'For this 5,000 sqm office space, we utilized carbon-neutral modular carpet tiles in varying grey tones to define different work zones and pathways. The client required a low-VOC, sustainable solution that allowed for frequent access to underfloor power and data cabling.\n\nThe result is a productive, quiet, and ergonomically superior office environment that has become a benchmark for workplace design in the region.',
      images: [IMAGES.office, IMAGES.flooring1],
    },
    {
      title: 'Al Noor Community Mosque',
      slug: 'al-noor-mosque',
      client: 'Awqaf Department',
      location: 'Ajman, UAE',
      industry: 'mosques',
      description: 'Soft, high-density prayer carpets with integrated alignment patterns.',
      content:
        'The Al Noor Mosque project involved carpeting the entire prayer hall with custom-dyed green carpets featuring gold Saf (alignment) lines. We used our signature high-twist yarn technology to ensure the carpet remains plush for years to come despite daily heavy footfall.\n\nAll installation was completed during off-peak hours to ensure that daily prayers remained uninterrupted, showcasing our commitment to community respect and service excellence.',
      images: [IMAGES.mosque, IMAGES.flooring2],
    },
  ]

  for (const item of projectData) {
    const featuredMedia = await uploadImage(payload, item.images[0], item.title, item.slug)
    const galleryMedias = await Promise.all(
      item.images.map((img, i) =>
        uploadImage(payload, img, `${item.title} Gallery ${i}`, `${item.slug}-gal-${i}`),
      ),
    )

    await payload.delete({ collection: 'projects', where: { slug: { equals: item.slug } } })
    await payload.create({
      collection: 'projects',
      data: {
        title: item.title,
        slug: item.slug,
        client: item.client,
        location: item.location,
        category: findIndustryId(item.industry) as any,
        featuredImage: featuredMedia.id,
        layout: [
          {
            blockType: 'content',
            content: generateLexicalContent(item.content),
          },
          {
            blockType: 'gallery',
            images: galleryMedias.map((m) => ({ image: m.id })),
          },
        ],
      },
    })
  }

  console.log('Seeding completed!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
