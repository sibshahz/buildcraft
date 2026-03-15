import type { CollectionConfig } from 'payload'

export const ContactRequests: CollectionConfig = {
  slug: 'contact-requests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service', 'status', 'createdAt'],
    listSearchableFields: ['name', 'email', 'phone', 'message'],
  },
  access: {
    create: () => true, // Anyone can submit a contact request
    read: ({ req: { user } }) => !!user, // Only logged-in users can see requests
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      validate: (val: string | null | undefined) => {
        if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          return 'Please enter a valid email address'
        }
        return true
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      validate: (val: string | null | undefined) => {
        if (!val || val.length < 7) {
          return 'Please enter a valid phone number'
        }
        return true
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'service',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
        components: {
          Cell: '/components/admin/StatusCell#StatusCell',
        },
      },
    },
    {
      name: 'addQuickNote',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/QuickNote#QuickNote',
        },
      },
    },
    {
      name: 'internalNotes',
      type: 'array',
      label: 'Internal Logs/Notes',
      admin: {
        description: 'Manage internal notes and logs for this contact query.',
      },
      fields: [
        {
          name: 'note',
          type: 'textarea',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          admin: {
            readOnly: true,
          },
          defaultValue: () => new Date(),
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            readOnly: true,
          },
          defaultValue: ({ user }) => user?.id,
        },
      ],
    },
    {
      name: 'turnstileToken',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeValidate: [
          async ({ value, req }) => {
            // Skip verification in development
            if (process.env.NODE_ENV === 'development') return value

            // Only verify on create
            if (req.method !== 'POST') return value

            if (!value) {
              throw new Error('Please complete the security check')
            }

            const response = await fetch(
              'https://challenges.cloudflare.com/turnstile/v0/siteverify',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `secret=${process.env.TURNSTILE_SECURITY_KEY}&response=${value}`,
              },
            )

            const result = await response.json()

            if (!result.success) {
              throw new Error('Security check failed. Please try again.')
            }

            return value
          },
        ],
      },
      access: {
        create: () => true,
        read: () => false,
        update: () => false,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          await req.payload.sendEmail({
            to: process.env.SALES_EMAIL || process.env.GMAIL_EMAIL || '',
            subject: `New Contact Request from ${doc.name}`,
            html: `
              <h1>New Contact Request</h1>
              <p><strong>Name:</strong> ${doc.name}</p>
              <p><strong>Email:</strong> ${doc.email}</p>
              <p><strong>Phone:</strong> ${doc.phone}</p>
              <p><strong>Service:</strong> ${doc.service}</p>
              <p><strong>Message:</strong></p>
              <p>${doc.message}</p>
              <hr />
              <p>View in Admin Panel: <a href="${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/admin/collections/contact-requests/${doc.id}">${doc.id}</a></p>
            `,
          })
        }
      },
    ],
  },
  timestamps: true,
}
