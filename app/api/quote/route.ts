import { NextRequest, NextResponse } from 'next/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { sendQuoteNotification } from '@/lib/email'
import { quoteRequestSchema, formatZodErrors } from '@/lib/validation'

// Lazy initialization of Supabase client
let supabase: SupabaseClient | null = null

function getSupabase(): SupabaseClient | null {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      return null
    }
    supabase = createClient(url, key)
  }
  return supabase
}

// Product interface for cart items
interface CartProduct {
  productId: string
  sapCode: string
  title: string
  model: string
  brand: string
  brandSlug: string
  quantity: number
  priceAmount: number | null
  priceCurrency: string
}

export async function POST(request: NextRequest) {
  try {
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Date invalide.' },
        { status: 400 }
      )
    }

    // Validate with Zod schema
    const validationResult = quoteRequestSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: formatZodErrors(validationResult.error) },
        { status: 400 }
      )
    }

    const {
      contact_name,
      contact_email,
      contact_phone,
      contact_company,
      contact_message,
      product_id,  // Legacy: single product
      products     // New: array of products from cart
    } = validationResult.data

    // Get Supabase client
    const supabaseClientOrNull = getSupabase()
    if (!supabaseClientOrNull) {
      return NextResponse.json(
        { error: 'Database service not available.' },
        { status: 500 }
      )
    }
    const supabaseClient = supabaseClientOrNull

    // Generate quote number
    const today = new Date()
    const year = today.getFullYear()
    const yearStart = `${year}-01-01`

    let countResult
    try {
      countResult = await supabaseClient
        .from('quote_requests')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', yearStart)
    } catch (err) {
      console.error('Quote count error:', err)
      countResult = { count: 0, error: null }
    }

    const { count, error: countError } = countResult
    if (countError) {
      console.error('Quote count DB error:', countError)
    }

    const quoteNumber = `XEH-${year}-${String((count || 0) + 1).padStart(5, '0')}`

    // Insert quote request
    let insertResult
    try {
      insertResult = await supabaseClient
        .from('quote_requests')
        .insert({
          quote_number: quoteNumber,
          contact_name,
          contact_email,
          contact_phone,
          contact_company: contact_company || null,
          contact_message: contact_message || null,
          status: 'pending',
        })
        .select()
        .single()
    } catch {
      return NextResponse.json(
        { error: 'A apărut o eroare la salvarea cererii.' },
        { status: 500 }
      )
    }

    const { data, error } = insertResult
    if (error) {
      return NextResponse.json(
        { error: 'A apărut o eroare la salvarea cererii.' },
        { status: 500 }
      )
    }

    // Handle multiple products from cart
    if (products && Array.isArray(products) && products.length > 0 && data) {
      const cartProducts: CartProduct[] = products

      // Insert all quote items
      const quoteItems = cartProducts.map((p: CartProduct) => ({
        quote_id: data.id,
        product_name: p.title,
        product_sku: p.sapCode,
        quantity: p.quantity,
      }))

      try {
        await supabaseClient.from('quote_items').insert(quoteItems)
      } catch (err) {
        console.error('Quote items insert error:', err)
        // Don't fail the whole request if items insert fails
      }

      // Send email with all products
      try {
        await sendQuoteNotification({
          quoteNumber,
          contactName: contact_name,
          contactEmail: contact_email,
          contactPhone: contact_phone,
          contactCompany: contact_company,
          contactMessage: contact_message,
          products: cartProducts.map((p: CartProduct) => ({
            name: p.title,
            sku: p.sapCode,
            model: p.model,
            brand: p.brand,
            brandSlug: p.brandSlug,
            quantity: p.quantity,
            priceAmount: p.priceAmount,
            priceCurrency: p.priceCurrency,
          })),
        })
      } catch (err) {
        console.error('Quote email notification error:', err)
        // Continue even if email fails - the quote is still saved
      }

      return NextResponse.json({
        success: true,
        quoteNumber: quoteNumber,
        itemCount: cartProducts.length,
      })
    }

    // Legacy: single product support
    if (product_id && data) {
      const { data: productData } = await supabaseClient
        .from('products')
        .select('id, model, sap_code, title_en, price_amount, price_currency, brand:brands(name, slug)')
        .eq('id', product_id)
        .single()

      if (productData) {
        const product = productData
        await supabaseClient
          .from('quote_items')
          .insert({
            quote_id: data.id,
            product_id: product.id,
            product_name: product.title_en?.split('|')[0] || product.model,
            product_sku: product.sap_code,
            quantity: 1,
          })

        // Handle both array and object cases from Supabase join
        const brandRaw = product.brand as unknown
        const brandData = Array.isArray(brandRaw) ? brandRaw[0] as { name: string; slug: string } | undefined : brandRaw as { name: string; slug: string } | null

        // Send email notification with single product
        try {
          await sendQuoteNotification({
            quoteNumber,
            contactName: contact_name,
            contactEmail: contact_email,
            contactPhone: contact_phone,
            contactCompany: contact_company,
            contactMessage: contact_message,
            products: [{
              name: product.title_en?.split('|')[0] || product.model,
              sku: product.sap_code,
              model: product.model,
              brand: brandData?.name || 'RM',
              brandSlug: brandData?.slug || 'rm',
              quantity: 1,
              priceAmount: product.price_amount,
              priceCurrency: product.price_currency || 'EUR',
            }],
          })
        } catch (err) {
          console.error('Quote email notification error:', err)
          // Continue even if email fails
        }
      }
    } else if (!products && data) {
      // No products - general inquiry
      try {
        await sendQuoteNotification({
          quoteNumber,
          contactName: contact_name,
          contactEmail: contact_email,
          contactPhone: contact_phone,
          contactCompany: contact_company,
          contactMessage: contact_message,
        })
      } catch (err) {
        console.error('Quote email notification error:', err)
        // Continue even if email fails
      }
    }

    return NextResponse.json({
      success: true,
      quoteNumber: quoteNumber,
    })
  } catch (err) {
    console.error('Quote API error:', err)
    return NextResponse.json(
      { error: 'A apărut o eroare.' },
      { status: 500 }
    )
  }
}
