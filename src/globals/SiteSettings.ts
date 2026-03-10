import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Site Logo',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact Info',
          fields: [
            {
              name: 'phone',
              type: 'text',
              required: true,
              label: 'Phone Number',
            },
            {
              name: 'email',
              type: 'email',
              required: true,
              label: 'Support Email',
            },
            {
              name: 'address',
              type: 'textarea',
              required: true,
              label: 'Office Address',
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Media Links',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                  ],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'copyright',
              type: 'text',
              defaultValue: '© 2024 BuildCraft Flooring & Décor - F.Z.E. All rights reserved.',
              label: 'Copyright Text',
            },
          ],
        },
      ],
    },
  ],
}
