import { NextRequest, NextResponse } from 'next/server'
import { sendContactNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, company, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Câmpurile obligatorii lipsesc.' },
        { status: 400 }
      )
    }

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
