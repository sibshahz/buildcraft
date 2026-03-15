import type { CollectionConfig } from 'payload'

export const Industries: CollectionConfig = {
  slug: 'industries',
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
      index: true,
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Hotel', value: 'hotel' },
        { label: 'Office', value: 'office' },
        { label: 'Villa', value: 'villa' },
        { label: 'Mosque', value: 'mosque' },
        { label: 'Shop', value: 'shop' },
        { label: 'Graduation', value: 'graduation' },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
