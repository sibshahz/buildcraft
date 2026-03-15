'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function submitContactForm(formData: {
  name: string
  email: string
  phone: string
  service: string
  message: string
  turnstileToken: string
}) {
  const payload = await getPayload({ config: configPromise })

  try {
    await payload.create({
      collection: 'contact-requests',
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        turnstileToken: formData.turnstileToken,
      },
    })

    return { success: true }
  } catch (error: any) {
    console.error('Error submitting contact form:', error)
    return {
      success: false,
      error: error.message || 'Something went wrong. Please try again.',
    }
  }
}
