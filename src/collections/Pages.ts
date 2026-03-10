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
      blocks: [HeroBlock, ContentBlock, TwoColumnBlock, ValuesBlock, QuoteBlock, CTABlock],
      required: true,
    },
  ],
}
