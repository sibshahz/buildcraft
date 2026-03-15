import type { Block, CollectionConfig } from 'payload'

const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
  ],
}

const ContentBlock: Block = {
  slug: 'content',
  fields: [{ name: 'content', type: 'richText', required: true }],
}

const TwoColumnBlock: Block = {
  slug: 'twoColumn',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'content', type: 'richText', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'direction',
      type: 'select',
      defaultValue: 'imageRight',
      options: [
        { label: 'Image Right', value: 'imageRight' },
        { label: 'Image Left', value: 'imageLeft' },
      ],
    },
  ],
}

const ValuesBlock: Block = {
  slug: 'values',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
    {
      name: 'values',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Quality (Shield)', value: 'shield' },
            { label: 'Client (Users)', value: 'users' },
            { label: 'Innovation (Target)', value: 'target' },
          ],
        },
      ],
    },
  ],
}

const QuoteBlock: Block = {
  slug: 'quote',
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'author', type: 'text' },
    { name: 'role', type: 'text' },
  ],
}

const CTABlock: Block = {
  slug: 'cta',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'buttonText', type: 'text', defaultValue: 'Get in Touch' },
    { name: 'buttonLink', type: 'text', defaultValue: '/contact' },
  ],
}

const ArchiveBlock: Block = {
  slug: 'archive',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'collection',
      type: 'select',
      required: true,
      options: [
        { label: 'Services', value: 'services' },
        { label: 'Projects', value: 'projects' },
        { label: 'Industries', value: 'industries' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
    },
  ],
}

const StatsBlock: Block = {
  slug: 'stats',
  fields: [
    {
      name: 'stats',
      type: 'array',
      required: true,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

const ProcessBlock: Block = {
  slug: 'process',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

const ServicesGridBlock: Block = {
  slug: 'servicesGrid',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
  ],
}

const IndustriesGridBlock: Block = {
  slug: 'industriesGrid',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
  ],
}

const AboutBlock: Block = {
  slug: 'about',
  fields: [
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'The BuildCraft Legacy',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Regional Expertise. Global Quality.',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'e.g. "about" or "contact"',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        ContentBlock,
        TwoColumnBlock,
        ValuesBlock,
        QuoteBlock,
        CTABlock,
        ArchiveBlock,
        StatsBlock,
        ProcessBlock,
        ServicesGridBlock,
        IndustriesGridBlock,
        AboutBlock,
      ],
      required: true,
    },
  ],
}
