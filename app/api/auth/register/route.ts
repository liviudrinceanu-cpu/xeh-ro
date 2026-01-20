import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendPartnerRegistrationNotification } from '@/lib/email'

// Create admin client for registration (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      email,
      password,
      first_name,
      last_name,
      phone,
      company_name,
      company_cui,
      company_reg_com,
      address_street,
      address_city,
      address_county,
      address_postal_code,
    } = body

    // Validate required fields
    if (!email || !password || !first_name || !last_name || !phone || !company_name || !company_cui) {
      return NextResponse.json(
        { error: 'Toate câmpurile obligatorii trebuie completate' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email invalid' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Parola trebuie să aibă minim 8 caractere' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingUser } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Există deja un cont cu această adresă de email' },
        { status: 400 }
      )
    }

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for B2B
    })

    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: 'Eroare la crearea contului. Încearcă din nou.' },
        { status: 500 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Eroare la crearea utilizatorului' },
        { status: 500 }
      )
    }

    // Create user profile
    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        email,
        role: 'partner',
        first_name,
        last_name,
        phone,
        company_name,
        company_cui,
        company_reg_com: company_reg_com || null,
        address_street: address_street || null,
        address_city: address_city || null,
        address_county: address_county || null,
        address_postal_code: address_postal_code || null,
        address_country: 'România',
        preferred_language: 'ro',
      })

    if (profileError) {
      console.error('Profile error:', profileError)
      // Try to clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: 'Eroare la crearea profilului. Încearcă din nou.' },
        { status: 500 }
      )
    }

    // Create partner record (pending approval)
    const { data: partnerData, error: partnerError } = await supabaseAdmin
      .from('partners')
      .insert({
        user_id: authData.user.id,
        is_approved: false,
        company_name: company_name,
        cui: company_cui,
        reg_com: company_reg_com || null,
        address: [address_street, address_city, address_county, address_postal_code].filter(Boolean).join(', ') || null,
      })
      .select('id')
      .single()

    if (partnerError) {
      console.error('Partner error:', partnerError)
      // Clean up on failure
      await supabaseAdmin.from('user_profiles').delete().eq('id', authData.user.id)
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: 'Eroare la crearea contului de partener. Încearcă din nou.' },
        { status: 500 }
      )
    }

    // Send notification email to secretariat with all details
    try {
      await sendPartnerRegistrationNotification({
        partnerId: partnerData.id,
        firstName: first_name,
        lastName: last_name,
        email,
        phone,
        companyName: company_name,
        companyCui: company_cui,
        companyRegCom: company_reg_com,
        addressStreet: address_street,
        addressCity: address_city,
        addressCounty: address_county,
        addressPostalCode: address_postal_code,
      })
    } catch (emailError) {
      // Log error but don't fail registration
      console.error('Email notification error:', emailError)
    }

    return NextResponse.json({
      success: true,
      message: 'Cont creat cu succes. Așteaptă aprobarea administratorului.',
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Eroare server. Încearcă din nou.' },
      { status: 500 }
    )
  }
}
