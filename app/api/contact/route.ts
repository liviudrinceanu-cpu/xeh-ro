import { NextRequest, NextResponse } from 'next/server'
import { sendContactNotification } from '@/lib/email'
import { contactFormSchema, formatZodErrors } from '@/lib/validation'

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
    const validationResult = contactFormSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: formatZodErrors(validationResult.error) },
        { status: 400 }
      )
    }

    const { name, email, phone, company, subject, message } = validationResult.data

    // Send email notification
    const emailResult = await sendContactNotification({
      name,
      email,
      phone,
      company,
      subject,
      message,
    })

    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error)
    }

    return NextResponse.json({
      success: true,
      message: 'Mesaj primit cu succes.',
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'A apărut o eroare.' },
      { status: 500 }
    )
  }
}
