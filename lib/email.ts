import { Resend } from 'resend'

// Lazy initialization to avoid build errors
let resendClient: Resend | null = null

function getResend(): Resend | null {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return null
    }
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

// Email-ul unde primești notificările
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@xeh.ro'
const FROM_EMAIL = process.env.FROM_EMAIL || 'XEH.ro <onboarding@resend.dev>'

interface QuoteProduct {
  name: string
  sku: string
  model: string
  brand: string
  brandSlug: string
  quantity: number
  priceAmount: number | null
  priceCurrency: string
}

interface QuoteEmailData {
  quoteNumber: string
  contactName: string
  contactEmail: string
  contactPhone: string
  contactCompany?: string
  contactMessage?: string
  products?: QuoteProduct[]
}

export async function sendQuoteNotification(data: QuoteEmailData) {
  const { quoteNumber, contactName, contactEmail, contactPhone, contactCompany, contactMessage, products } = data

  // Calculate totals
  const hasProducts = products && products.length > 0
  let totalPrice = 0
  let itemsWithoutPrice = 0
  let totalQuantity = 0

  if (hasProducts) {
    products.forEach(p => {
      totalQuantity += p.quantity
      if (p.priceAmount !== null) {
        totalPrice += p.priceAmount * p.quantity
      } else {
        itemsWithoutPrice += p.quantity
      }
    })
  }

  // Format price helper
  const formatPrice = (amount: number | null, currency: string) => {
    if (amount === null) return 'La cerere'
    return `${amount.toLocaleString('ro-RO')} ${currency}`
  }

  // Generate products table for admin email
  const productsTableAdmin = hasProducts ? `
    <div style="margin-top: 25px;">
      <h3 style="color: #1D1D1F; margin: 0 0 15px 0; font-size: 16px;">Produse Solicitate (${totalQuantity})</h3>
      <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e5e5e5;">
        <thead>
          <tr style="background: #f3f4f6;">
            <th style="padding: 12px; text-align: left; color: #666; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #e5e5e5;">Produs</th>
            <th style="padding: 12px; text-align: center; color: #666; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #e5e5e5;">Cant.</th>
            <th style="padding: 12px; text-align: right; color: #666; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #e5e5e5;">Preț/buc</th>
            <th style="padding: 12px; text-align: right; color: #666; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #e5e5e5;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(p => `
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #f3f4f6;">
                <a href="https://xeh.ro/${p.brandSlug}/produs/${p.sku}" style="color: #DC143C; text-decoration: none; font-weight: 500;">${p.name}</a>
                <br><span style="color: #666; font-size: 12px;">${p.brand} | ${p.model} | ${p.sku}</span>
              </td>
              <td style="padding: 12px; text-align: center; border-bottom: 1px solid #f3f4f6; font-weight: 500;">${p.quantity}</td>
              <td style="padding: 12px; text-align: right; border-bottom: 1px solid #f3f4f6; ${p.priceAmount === null ? 'color: #666; font-style: italic;' : ''}">${formatPrice(p.priceAmount, p.priceCurrency)}</td>
              <td style="padding: 12px; text-align: right; border-bottom: 1px solid #f3f4f6; font-weight: 500; ${p.priceAmount === null ? 'color: #666; font-style: italic;' : ''}">${p.priceAmount !== null ? formatPrice(p.priceAmount * p.quantity, p.priceCurrency) : 'La cerere'}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr style="background: #f9fafb;">
            <td colspan="3" style="padding: 12px; text-align: right; font-weight: 600; color: #1D1D1F;">TOTAL ESTIMAT:</td>
            <td style="padding: 12px; text-align: right; font-weight: 700; color: #DC143C; font-size: 16px;">
              ${totalPrice > 0 ? `${totalPrice.toLocaleString('ro-RO')} EUR` : ''}
              ${itemsWithoutPrice > 0 ? `${totalPrice > 0 ? '<br>' : ''}<span style="font-size: 12px; color: #666; font-weight: normal;">+ ${itemsWithoutPrice} la cerere</span>` : ''}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  ` : ''

  // Generate products list for client email
  const productsListClient = hasProducts ? `
    <div style="margin: 20px 0;">
      <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">Produse solicitate:</p>
      <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e5e5e5;">
        ${products.map(p => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f3f4f6;">
              <a href="https://xeh.ro/${p.brandSlug}/produs/${p.sku}" style="color: #DC143C; text-decoration: none; font-weight: 500;">${p.name}</a>
              <br><span style="color: #666; font-size: 12px;">Cod: ${p.sku} | Cantitate: ${p.quantity}</span>
            </td>
            <td style="padding: 12px; text-align: right; border-bottom: 1px solid #f3f4f6; white-space: nowrap;">
              ${p.priceAmount !== null ? `<span style="font-weight: 500;">${formatPrice(p.priceAmount * p.quantity, p.priceCurrency)}</span>` : '<span style="color: #666; font-style: italic;">La cerere</span>'}
            </td>
          </tr>
        `).join('')}
        ${totalPrice > 0 || itemsWithoutPrice > 0 ? `
        <tr style="background: #f9fafb;">
          <td style="padding: 12px; font-weight: 600; color: #1D1D1F;">Total estimat:</td>
          <td style="padding: 12px; text-align: right; font-weight: 700; color: #DC143C;">
            ${totalPrice > 0 ? `${totalPrice.toLocaleString('ro-RO')} EUR` : ''}
            ${itemsWithoutPrice > 0 ? `${totalPrice > 0 ? ' + ' : ''}${itemsWithoutPrice} la cerere` : ''}
          </td>
        </tr>
        ` : ''}
      </table>
      <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">* Prețurile sunt orientative și pot varia în funcție de cantitate și configurație.</p>
    </div>
  ` : ''

  // Email către admin
  const adminEmailContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #DC143C 0%, #1D1D1F 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Cerere Ofertă Nouă</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">${quoteNumber}${hasProducts ? ` • ${totalQuantity} produs${totalQuantity > 1 ? 'e' : ''}` : ''}</p>
      </div>

      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #1D1D1F; margin: 0 0 20px 0; font-size: 18px;">Detalii Contact</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #666; width: 120px;">Nume:</td>
            <td style="padding: 10px 0; color: #1D1D1F; font-weight: 500;">${contactName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Email:</td>
            <td style="padding: 10px 0;">
              <a href="mailto:${contactEmail}" style="color: #DC143C; text-decoration: none;">${contactEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666;">Telefon:</td>
            <td style="padding: 10px 0;">
              <a href="tel:${contactPhone}" style="color: #DC143C; text-decoration: none;">${contactPhone}</a>
            </td>
          </tr>
          ${contactCompany ? `
          <tr>
            <td style="padding: 10px 0; color: #666;">Companie:</td>
            <td style="padding: 10px 0; color: #1D1D1F;">${contactCompany}</td>
          </tr>
          ` : ''}
        </table>

        ${productsTableAdmin}

        ${contactMessage ? `
        <div style="margin-top: 25px;">
          <h3 style="color: #1D1D1F; margin: 0 0 10px 0; font-size: 16px;">Mesaj</h3>
          <p style="color: #444; line-height: 1.6; margin: 0; padding: 15px; background: white; border-radius: 8px; border: 1px solid #e5e5e5;">${contactMessage}</p>
        </div>
        ` : ''}
      </div>

      <div style="padding: 20px 30px; background: #1D1D1F; text-align: center;">
        <a href="mailto:${contactEmail}?subject=Re: Cerere Ofertă ${quoteNumber}"
           style="display: inline-block; padding: 12px 30px; background: #DC143C; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
          Răspunde Clientului
        </a>
      </div>

      <div style="padding: 20px; text-align: center; color: #999; font-size: 12px;">
        <p>XEH.ro - eXpert Echipamente Horeca</p>
      </div>
    </div>
  `

  // Email de confirmare către client
  const clientEmailContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #DC143C 0%, #1D1D1F 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Cererea ta a fost înregistrată!</h1>
      </div>

      <div style="padding: 30px;">
        <p style="color: #1D1D1F; font-size: 16px; line-height: 1.6;">
          Salut <strong>${contactName}</strong>,
        </p>

        <p style="color: #444; line-height: 1.6;">
          Mulțumim pentru interesul acordat! Am primit cererea ta de ofertă și vom reveni cu un răspuns în cel mai scurt timp posibil.
        </p>

        <div style="margin: 25px 0; padding: 20px; background: #f9f9f9; border-radius: 12px; text-align: center;">
          <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">Numărul cererii tale:</p>
          <p style="margin: 0; color: #DC143C; font-size: 24px; font-weight: bold;">${quoteNumber}</p>
        </div>

        ${productsListClient}

        <p style="color: #444; line-height: 1.6;">
          Un reprezentant XEH.ro te va contacta în curând pentru a discuta detaliile ofertei.
        </p>

        <p style="color: #444; line-height: 1.6; margin-top: 25px;">
          Cu stimă,<br>
          <strong>Echipa XEH.ro</strong>
        </p>
      </div>

      <div style="padding: 20px; background: #f9f9f9; text-align: center; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Ai întrebări? Contactează-ne:</p>
        <p style="margin: 0;">
          <a href="mailto:contact@xeh.ro" style="color: #DC143C; text-decoration: none;">contact@xeh.ro</a>
        </p>
      </div>
    </div>
  `

  try {
    const resend = getResend()
    if (!resend) {
      console.warn('Email not sent: Resend not configured')
      return { success: false, error: 'Email service not configured' }
    }

    // Trimite email către admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `[Cerere Ofertă] ${quoteNumber} - ${contactName}`,
      html: adminEmailContent,
    })

    // Trimite email de confirmare către client
    await resend.emails.send({
      from: FROM_EMAIL,
      to: contactEmail,
      subject: `Cererea ta ${quoteNumber} a fost înregistrată - XEH.ro`,
      html: clientEmailContent,
    })

    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
}

export async function sendContactNotification(data: ContactEmailData) {
  const { name, email, phone, company, subject, message } = data

  const emailContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1D1D1F; padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Mesaj Nou de Contact</h1>
      </div>

      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #1D1D1F; margin: 0 0 5px 0; font-size: 18px;">${subject}</h2>
        <p style="color: #666; margin: 0 0 20px 0;">de la ${name}</p>

        <div style="padding: 20px; background: white; border-radius: 12px; margin-bottom: 20px;">
          <p style="color: #444; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 100px;">Email:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${email}" style="color: #DC143C; text-decoration: none;">${email}</a>
            </td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 8px 0; color: #666;">Telefon:</td>
            <td style="padding: 8px 0;">
              <a href="tel:${phone}" style="color: #DC143C; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          ` : ''}
          ${company ? `
          <tr>
            <td style="padding: 8px 0; color: #666;">Companie:</td>
            <td style="padding: 8px 0; color: #1D1D1F;">${company}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      <div style="padding: 20px 30px; background: #1D1D1F; text-align: center;">
        <a href="mailto:${email}?subject=Re: ${subject}"
           style="display: inline-block; padding: 12px 30px; background: #DC143C; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
          Răspunde
        </a>
      </div>
    </div>
  `

  try {
    const resend = getResend()
    if (!resend) {
      console.warn('Email not sent: Resend not configured')
      return { success: false, error: 'Email service not configured' }
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `[Contact] ${subject} - ${name}`,
      html: emailContent,
      replyTo: email,
    })

    return { success: true }
  } catch (error) {
    console.error('Error sending contact email:', error)
    return { success: false, error }
  }
}

// Partner Registration Email Data
interface PartnerRegistrationEmailData {
  partnerId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  companyCui: string
  companyRegCom?: string
  addressStreet?: string
  addressCity?: string
  addressCounty?: string
  addressPostalCode?: string
}

// Email către secretariat pentru notificare partener nou
const SECRETARIAT_EMAIL = 'secretariat@infinitrade-romania.ro'

export async function sendPartnerRegistrationNotification(data: PartnerRegistrationEmailData) {
  const {
    partnerId,
    firstName,
    lastName,
    email,
    phone,
    companyName,
    companyCui,
    companyRegCom,
    addressStreet,
    addressCity,
    addressCounty,
    addressPostalCode
  } = data

  // Construiește adresa completă
  const addressParts = [addressStreet, addressCity, addressCounty, addressPostalCode].filter(Boolean)
  const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : null

  // Link direct la pagina de aprobare
  const approvalLink = `https://xeh.ro/admin/partners/${partnerId}`

  // Email către secretariat
  const adminEmailContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1D1D1F 0%, #DC143C 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Partener Nou Înregistrat</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">Necesită aprobare</p>
      </div>

      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #1D1D1F; margin: 0 0 20px 0; font-size: 18px;">Detalii Complete Partener</h2>

        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
          <h3 style="color: #666; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase;">Date Personale</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Nume complet:</td>
              <td style="padding: 8px 0; color: #1D1D1F; font-weight: 500;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email:</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #DC143C; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Telefon:</td>
              <td style="padding: 8px 0;">
                <a href="tel:${phone}" style="color: #DC143C; text-decoration: none; font-weight: 500;">${phone}</a>
              </td>
            </tr>
          </table>
        </div>

        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
          <h3 style="color: #666; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase;">Date Companie</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Denumire:</td>
              <td style="padding: 8px 0; color: #1D1D1F; font-weight: 500;">${companyName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">CUI:</td>
              <td style="padding: 8px 0; color: #1D1D1F; font-weight: 500;">${companyCui}</td>
            </tr>
            ${companyRegCom ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Nr. Reg. Com.:</td>
              <td style="padding: 8px 0; color: #1D1D1F;">${companyRegCom}</td>
            </tr>
            ` : ''}
          </table>
        </div>

        ${fullAddress ? `
        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
          <h3 style="color: #666; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase;">Adresa</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${addressStreet ? `
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Stradă:</td>
              <td style="padding: 8px 0; color: #1D1D1F;">${addressStreet}</td>
            </tr>
            ` : ''}
            ${addressCity ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Oraș:</td>
              <td style="padding: 8px 0; color: #1D1D1F;">${addressCity}</td>
            </tr>
            ` : ''}
            ${addressCounty ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Județ:</td>
              <td style="padding: 8px 0; color: #1D1D1F;">${addressCounty}</td>
            </tr>
            ` : ''}
            ${addressPostalCode ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Cod Poștal:</td>
              <td style="padding: 8px 0; color: #1D1D1F;">${addressPostalCode}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        ` : ''}

        <div style="background: #fff3cd; padding: 15px 20px; border-radius: 12px; border-left: 4px solid #ffc107;">
          <p style="margin: 0; color: #856404; font-size: 14px;">
            <strong>Acțiune necesară:</strong> Accesează link-ul de mai jos pentru a aproba sau respinge această cerere de parteneriat.
          </p>
        </div>
      </div>

      <div style="padding: 25px 30px; background: #1D1D1F; text-align: center;">
        <p style="color: rgba(255,255,255,0.7); margin: 0 0 15px 0; font-size: 14px;">
          Click pe butonul de mai jos pentru a te autentifica și aproba partenerul:
        </p>
        <a href="${approvalLink}"
           style="display: inline-block; padding: 14px 40px; background: #22c55e; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px;">
          Aprobă Partenerul
        </a>
        <p style="color: rgba(255,255,255,0.5); margin: 15px 0 0 0; font-size: 12px;">
          Vei fi redirecționat la pagina de login dacă nu ești autentificat.
        </p>
      </div>

      <div style="padding: 20px; text-align: center; color: #999; font-size: 12px;">
        <p style="margin: 0;">XEH.ro - eXpert Echipamente Horeca</p>
        <p style="margin: 5px 0 0 0;">
          <a href="${approvalLink}" style="color: #666; text-decoration: underline;">${approvalLink}</a>
        </p>
      </div>
    </div>
  `

  try {
    const resend = getResend()
    if (!resend) {
      console.warn('Email not sent: Resend not configured')
      return { success: false, error: 'Email service not configured' }
    }

    // Trimite email la secretariat
    await resend.emails.send({
      from: FROM_EMAIL,
      to: SECRETARIAT_EMAIL,
      subject: `[Partener Nou - Aprobare Necesară] ${companyName} - ${firstName} ${lastName}`,
      html: adminEmailContent,
    })

    return { success: true }
  } catch (error) {
    console.error('Error sending partner registration email:', error)
    return { success: false, error }
  }
}

// Partner Approved Email
interface PartnerApprovedEmailData {
  firstName: string
  email: string
  companyName: string
}

export async function sendPartnerApprovedNotification(data: PartnerApprovedEmailData) {
  const { firstName, email, companyName } = data

  const emailContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #22c55e 0%, #1D1D1F 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Contul tău a fost aprobat!</h1>
      </div>

      <div style="padding: 30px;">
        <p style="color: #1D1D1F; font-size: 16px; line-height: 1.6;">
          Salut <strong>${firstName}</strong>,
        </p>

        <p style="color: #444; line-height: 1.6;">
          Vești bune! Contul de partener pentru <strong>${companyName}</strong> a fost aprobat și este acum activ.
        </p>

        <p style="color: #444; line-height: 1.6;">
          Acum ai acces la:
        </p>

        <ul style="color: #444; line-height: 1.8; padding-left: 20px;">
          <li>Prețuri speciale pentru parteneri</li>
          <li>Istoric cereri de ofertă</li>
          <li>Produse favorite</li>
          <li>Dashboard personalizat</li>
        </ul>

        <div style="margin: 30px 0; text-align: center;">
          <a href="https://xeh.ro/login"
             style="display: inline-block; padding: 14px 35px; background: #DC143C; color: white; text-decoration: none; border-radius: 10px; font-weight: 500; font-size: 16px;">
            Accesează Portalul
          </a>
        </div>

        <p style="color: #444; line-height: 1.6; margin-top: 25px;">
          Cu stimă,<br>
          <strong>Echipa XEH.ro</strong>
        </p>
      </div>

      <div style="padding: 20px; background: #f9f9f9; text-align: center; border-top: 1px solid #e5e5e5;">
        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Ai întrebări? Contactează-ne:</p>
        <p style="margin: 0;">
          <a href="mailto:contact@xeh.ro" style="color: #DC143C; text-decoration: none;">contact@xeh.ro</a>
          &nbsp;|&nbsp;
          <a href="tel:+40724256250" style="color: #DC143C; text-decoration: none;">+40 724 256 250</a>
        </p>
      </div>
    </div>
  `

  try {
    const resend = getResend()
    if (!resend) {
      console.warn('Email not sent: Resend not configured')
      return { success: false, error: 'Email service not configured' }
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Contul tău de partener a fost aprobat - XEH.ro`,
      html: emailContent,
    })

    return { success: true }
  } catch (error) {
    console.error('Error sending partner approved email:', error)
    return { success: false, error }
  }
}
