import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Industries } from './collections/Industries'
import { Projects } from './collections/Projects'
import { Pages } from './collections/Pages'
import { SiteSettings } from './globals/SiteSettings'

import { cloudinaryStorage } from 'payload-cloudinary'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Industries, Projects, Pages],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    ...(process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    (process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_KEY)
      ? [
          cloudinaryStorage({
            config: {
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
              api_key: process.env.CLOUDINARY_API_KEY as string,
              api_secret: (process.env.CLOUDINARY_API_SECRET ||
                process.env.CLOUDINARY_KEY) as string,
            },
            collections: {
              media: true,
            },
            disableLocalStorage: true,
          }),
        ]
      : []),
  ],
})
