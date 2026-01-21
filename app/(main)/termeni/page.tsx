import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termeni și Condiții | XEH.ro',
  description: 'Termenii și condițiile de utilizare a site-ului XEH.ro. Informații despre comandă, livrare, garanție și returnare echipamente HoReCa.',
  openGraph: {
    title: 'Termeni și Condiții | XEH.ro',
    description: 'Termenii și condițiile de utilizare a site-ului XEH.ro.',
    url: 'https://www.xeh.ro/termeni',
    siteName: 'XEH.ro',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Termeni și Condiții&subtitle=XEH.ro - eXpert Echipamente Horeca',
      width: 1200,
      height: 630,
      alt: 'Termeni și Condiții - XEH.ro',
    }],
    locale: 'ro_RO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.xeh.ro/termeni',
  },
}

export default function TermeniPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-600 mb-8">
        Termeni și Condiții
      </h1>

      <div className="prose prose-lg max-w-none text-gray-600">
        <p className="text-lg text-gray-500 mb-8">
          Ultima actualizare: Ianuarie 2026
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">1. Informații Generale</h2>
          <p>
            Prezentul document stabilește termenii și condițiile de utilizare a site-ului XEH.ro,
            operat de Expert Livius S.R.L. Prin accesarea și utilizarea acestui site,
            sunteți de acord cu respectarea acestor termeni și condiții.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">2. Solicitare Ofertă</h2>
          <p>
            XEH.ro funcționează ca platformă B2B pentru echipamente profesionale HoReCa.
            Produsele afișate sunt disponibile pentru solicitare de ofertă. Prețurile afișate
            sunt informative și pot varia în funcție de cantitate, configurație și condițiile
            de livrare. O ofertă personalizată va fi transmisă după procesarea cererii.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">3. Produse și Branduri</h2>
          <p>
            XEH.ro este distribuitor autorizat pentru echipamentele RM Gastro și REDFOX în România.
            Toate produsele beneficiază de garanție conform legislației în vigoare și specificațiilor
            producătorului. Specificațiile tehnice și imaginile produselor sunt cu titlu informativ.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">4. Livrare și Transport</h2>
          <p>
            Livrarea echipamentelor se efectuează în toată România. Costurile de transport
            și termenele de livrare sunt comunicate în oferta personalizată. Pentru echipamente
            voluminoase sau comenzi speciale, oferim servicii de transport specializat și
            instalare la cerere.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">5. Garanție și Service</h2>
          <p>
            Toate echipamentele comercializate beneficiază de garanția producătorului.
            Perioada de garanție variază în funcție de tipul produsului și este specificată
            în documentația fiecărui echipament. Oferim suport tehnic și service autorizat
            pentru brandurile RM Gastro și REDFOX.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">6. Proprietate Intelectuală</h2>
          <p>
            Conținutul site-ului XEH.ro, inclusiv texte, imagini, logo-uri și elemente grafice,
            este protejat de legile privind drepturile de autor. Reproducerea sau utilizarea
            fără acordul prealabil scris este interzisă.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">7. Limitarea Răspunderii</h2>
          <p>
            XEH.ro depune toate eforturile pentru a asigura acuratețea informațiilor prezentate.
            Cu toate acestea, nu garantăm că site-ul va funcționa fără întreruperi sau erori.
            Nu suntem răspunzători pentru eventuale prejudicii rezultate din utilizarea site-ului.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">8. Contact</h2>
          <p>
            Pentru orice întrebări referitoare la acești termeni și condiții, ne puteți contacta:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Telefon: <a href="tel:+40724256250" className="text-crimson hover:text-crimson-dark">0724 256 250</a></li>
            <li>Email: <a href="mailto:contact@xeh.ro" className="text-crimson hover:text-crimson-dark">contact@xeh.ro</a></li>
            <li>Site: <a href="https://www.xeh.ro/contact" className="text-crimson hover:text-crimson-dark">www.xeh.ro/contact</a></li>
          </ul>
        </section>
      </div>
    </div>
  )
}
