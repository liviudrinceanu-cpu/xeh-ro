import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendPartnerApprovedNotification } from '@/lib/email'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { partnerId, action, reason, email, name } = await request.json()

    if (action === 'approved') {
      // Get partner details
      const { data: partner } = await supabaseAdmin
        .from('partners')
        .select(`
          *,
          user_profile:user_profiles (first_name, last_name, email)
        `)
        .eq('id', partnerId)
        .single()

      if (partner) {
        const userProfile = Array.isArray(partner.user_profile)
          ? partner.user_profile[0]
          : partner.user_profile

        if (userProfile?.email) {
          await sendPartnerApprovedNotification({
            email: userProfile.email,
            firstName: userProfile.first_name,
            companyName: partner.company_name,
          })
        }
      }
    } else if (action === 'rejected' && email) {
      // Send rejection email using Resend
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'XEH.ro <noreply@xeh.ro>',
        to: email,
        subject: 'Cererea ta de parteneriat - XEH.ro',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1D1D1F;">Bună ${name || 'ziua'},</h2>
            <p>Ne pare rău să te informăm că cererea ta de parteneriat la XEH.ro nu a fost aprobată.</p>
            ${reason ? `<p><strong>Motiv:</strong> ${reason}</p>` : ''}
            <p>Dacă ai întrebări sau dorești să discuți despre alte opțiuni de colaborare, te rugăm să ne contactezi.</p>
            <p style="margin-top: 24px;">Cu stimă,<br>Echipa XEH.ro</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
