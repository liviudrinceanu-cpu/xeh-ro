import { z } from 'zod'

// Romanian phone number pattern (+40 or 07)
const phonePattern = /^(\+40|0)[0-9]{9}$/

// Romanian name pattern (allows diacritics)
const namePattern = /^[a-zA-ZăâîșțĂÂÎȘȚ\s\-']+$/

// Quote request validation schema
export const quoteRequestSchema = z.object({
  contact_name: z
    .string()
    .min(2, 'Numele trebuie să aibă minim 2 caractere')
    .max(100, 'Numele este prea lung')
    .regex(namePattern, 'Numele conține caractere invalide'),
  contact_email: z
    .string()
    .email('Email invalid'),
  contact_phone: z
    .string()
    .regex(phonePattern, 'Telefon invalid (ex: 0724123456 sau +40724123456)'),
  contact_company: z
    .string()
    .max(200, 'Numele companiei este prea lung')
    .optional()
    .transform(val => val || undefined),
  contact_message: z
    .string()
    .max(5000, 'Mesajul este prea lung')
    .optional()
    .transform(val => val || undefined),
  product_id: z.string().uuid().optional(),
  products: z.array(z.object({
    productId: z.string(),
    sapCode: z.string(),
    title: z.string(),
    model: z.string(),
    brand: z.string(),
    brandSlug: z.string(),
    quantity: z.number().int().min(1).max(999),
    priceAmount: z.number().nullable(),
    priceCurrency: z.string(),
  })).optional(),
})

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Numele trebuie să aibă minim 2 caractere')
    .max(100, 'Numele este prea lung')
    .regex(namePattern, 'Numele conține caractere invalide'),
  email: z
    .string()
    .email('Email invalid'),
  phone: z
    .string()
    .regex(phonePattern, 'Telefon invalid (ex: 0724123456 sau +40724123456)')
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .max(200, 'Numele companiei este prea lung')
    .optional(),
  subject: z
    .string()
    .min(3, 'Subiectul este prea scurt')
    .max(200, 'Subiectul este prea lung'),
  message: z
    .string()
    .min(10, 'Mesajul trebuie să aibă minim 10 caractere')
    .max(5000, 'Mesajul este prea lung'),
})

// Helper to extract validation errors
export function formatZodErrors(error: z.ZodError<unknown>): string {
  return error.issues.map(e => e.message).join(', ')
}
