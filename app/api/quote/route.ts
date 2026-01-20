import { NextRequest, NextResponse } from 'next/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { sendQuoteNotification } from '@/lib/email'

// Lazy initialization of Supabase client
let supabase: SupabaseClient | null = null

function getSupabase(): SupabaseClient | null {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      console.error('Supabase env vars missing:', { url: !!url, key: !!key })
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
  console.log('=== QUOTE API START ===')

  try {
    let body
    try {
      body = await request.json()
      console.log('Body parsed successfully')
    } catch (parseError) {
      console.error('Error parsing request body:', parseError)
      return NextResponse.json(
        { error: 'Date invalide.' },
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
    } = body

    console.log('Quote request received:', { contact_name, contact_email, productsCount: products?.length })
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'present' : 'MISSING')
    console.log('Supabase Service Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'present' : 'MISSING')

    // Validate required fields
    if (!contact_name || !contact_email || !contact_phone) {
      return NextResponse.json(
        { error: 'Câmpurile obligatorii lipsesc.' },
        { status: 400 }
      )
    }

    // Get Supabase client
    const supabaseClientOrNull = getSupabase()
    if (!supabaseClientOrNull) {
      console.error('Supabase client not available')
      return NextResponse.json(
        { error: 'Database service not available.', details: 'Supabase not configured' },
        { status: 500 }
      )
    }
    const supabaseClient = supabaseClientOrNull // Now definitely not null

    // Generate quote number
    console.log('Step 1: Generating quote number...')
    const today = new Date()
    const year = today.getFullYear()
    const yearStart = `${year}-01-01`

    let countResult
    try {
      // Count all quotes from this year (not just today)
      countResult = await supabaseClient
        .from('quote_requests')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', yearStart)
      console.log('Count query result:', { count: countResult.count, error: countResult.error })
    } catch (countQueryError) {
      console.error('Exception in count query:', countQueryError)
      countResult = { count: 0, error: countQueryError }
    }

    const { count, error: countError } = countResult
    if (countError) {
      console.error('Error getting quote count:', countError)
    }

    const quoteNumber = `XEH-${year}-${String((count || 0) + 1).padStart(5, '0')}`
    console.log('Generated quote number:', quoteNumber)

    // Insert quote request
    console.log('Step 2: Inserting quote request...')
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
      console.log('Insert result:', { data: insertResult.data?.id, error: insertResult.error })
    } catch (insertQueryError) {
      console.error('Exception in insert query:', insertQueryError)
      return NextResponse.json(
        { error: 'A apărut o eroare la salvarea cererii.', details: String(insertQueryError) },
        { status: 500 }
      )
    }

    const { data, error } = insertResult
    if (error) {
      console.error('Error creating quote:', error)
      return NextResponse.json(
        { error: 'A apărut o eroare la salvarea cererii.', details: JSON.stringify(error) },
        { status: 500 }
      )
    }

    console.log('Quote created successfully:', data?.id)

    // Handle multiple products from cart
    if (products && Array.isArray(products) && products.length > 0 && data) {
      const cartProducts: CartProduct[] = products
      console.log('Step 3: Processing cart products:', cartProducts.length)

      // Insert all quote items - skip product_id to avoid FK issues
      const quoteItems = cartProducts.map((p: CartProduct) => ({
        quote_id: data.id,
        product_name: p.title,
        product_sku: p.sapCode,
        quantity: p.quantity,
        // Skip product_id temporarily to avoid FK constraint issues
      }))

      console.log('Inserting quote items:', JSON.stringify(quoteItems))
      try {
        const { error: itemsError } = await supabaseClient.from('quote_items').insert(quoteItems)
        if (itemsError) {
          console.error('Error inserting quote items:', itemsError)
          // Don't fail the whole request if items insert fails - the quote is still created
        } else {
          console.log('Quote items inserted successfully')
        }
      } catch (itemsInsertError) {
        console.error('Exception inserting quote items:', itemsInsertError)
      }

      // Send email with all products (don't fail if email fails)
      console.log('Step 4: Sending email notification...')
      try {
        const emailResult = await sendQuoteNotification({
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
        console.log('Email result:', emailResult)
      } catch (emailError) {
        console.error('Error sending quote email:', emailError)
        // Continue even if email fails - the quote is still saved
      }

      console.log('=== QUOTE API SUCCESS (cart) ===')
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
        const product = productData // Now definitely not null
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

        // Send email notification with single product (using products array)
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
        } catch (emailError) {
          console.error('Error sending quote email:', emailError)
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
      } catch (emailError) {
        console.error('Error sending quote email:', emailError)
      }
    }

    return NextResponse.json({
      success: true,
      quoteNumber: quoteNumber,
    })
  } catch (error) {
    console.error('=== QUOTE API ERROR ===')
    console.error('Quote API error:', error)
    console.error('Error type:', typeof error)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    console.error('Error stack:', error instanceof Error ? error.stack : 'N/A')
    return NextResponse.json(
      { error: 'A apărut o eroare.', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
