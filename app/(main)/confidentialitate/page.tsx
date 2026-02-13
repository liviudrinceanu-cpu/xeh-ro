import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate | XEH.ro',
  description: 'Politica de confidențialitate XEH.ro. Cum colectăm, utilizăm și protejăm datele dumneavoastră personale.',
  openGraph: {
    title: 'Politica de Confidențialitate | XEH.ro',
    description: 'Politica de confidențialitate XEH.ro. Cum colectăm, utilizăm și protejăm datele dumneavoastră personale.',
    url: 'https://www.xeh.ro/confidentialitate',
    siteName: 'XEH.ro',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Politica de Confidențialitate&subtitle=XEH.ro - eXpert Echipamente Horeca',
      width: 1200,
      height: 630,
      alt: 'Politica de Confidențialitate - XEH.ro',
    }],
    locale: 'ro_RO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.xeh.ro/confidentialitate',
  },
}

export default function ConfidentialitatePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-600 mb-8">
        Politica de Confidențialitate
      </h1>

      <div className="prose prose-lg max-w-none text-gray-600">
        <p className="text-lg text-gray-500 mb-8">
          Ultima actualizare: Ianuarie 2026
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">1. Introducere</h2>
          <p>
            Driatheli Group S.R.L., operatorul site-ului XEH.ro, se angajează să protejeze
            confidențialitatea datelor dumneavoastră personale. Această politică explică
            cum colectăm, utilizăm, stocăm și protejăm informațiile dumneavoastră în
            conformitate cu Regulamentul General privind Protecția Datelor (GDPR).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">2. Date Colectate</h2>
          <p>Colectăm următoarele tipuri de informații:</p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Date de identificare:</strong> nume, prenume, denumire companie</li>
            <li><strong>Date de contact:</strong> adresă email, număr de telefon</li>
            <li><strong>Date de navigare:</strong> adresă IP, tip browser, pagini vizitate</li>
            <li><strong>Date din formulare:</strong> informații furnizate în cererile de ofertă</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">3. Scopul Prelucrării</h2>
          <p>Utilizăm datele dumneavoastră pentru:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Procesarea cererilor de ofertă pentru echipamente HoReCa</li>
            <li>Comunicarea informațiilor despre produse și servicii</li>
            <li>Îmbunătățirea experienței de navigare pe site</li>
            <li>Respectarea obligațiilor legale</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">4. Temeiul Legal</h2>
          <p>
            Prelucrăm datele dumneavoastră pe baza: consimțământului acordat,
            necesității executării unui contract, obligațiilor legale și interesului
            nostru legitim de a îmbunătăți serviciile oferite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">5. Stocarea Datelor</h2>
          <p>
            Datele dumneavoastră sunt stocate în siguranță pe servere securizate.
            Păstrăm informațiile doar atât timp cât este necesar pentru scopurile
            menționate sau conform cerințelor legale.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">6. Drepturile Dumneavoastră</h2>
          <p>Conform GDPR, aveți dreptul:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>De acces la datele personale</li>
            <li>De rectificare a datelor incorecte</li>
            <li>De ștergere a datelor (dreptul de a fi uitat)</li>
            <li>De restricționare a prelucrării</li>
            <li>De portabilitate a datelor</li>
            <li>De opoziție la prelucrare</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">7. Cookies</h2>
          <p>
            Site-ul XEH.ro utilizează cookies pentru îmbunătățirea experienței de navigare.
            Pentru informații detaliate, consultați{' '}
            <a href="/cookies" className="text-crimson hover:text-crimson-dark">
              Politica de Cookies
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">8. Securitatea Datelor</h2>
          <p>
            Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea
            datelor dumneavoastră împotriva accesului neautorizat, pierderii sau
            distrugerii accidentale.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">9. Contact DPO</h2>
          <p>
            Pentru exercitarea drepturilor dumneavoastră sau întrebări privind
            protecția datelor, ne puteți contacta:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Email: <a href="mailto:secretariat@infinitrade-romania.ro" className="text-crimson hover:text-crimson-dark">secretariat@infinitrade-romania.ro</a></li>
            <li>Telefon: <a href="tel:+40724256250" className="text-crimson hover:text-crimson-dark">0724 256 250</a></li>
          </ul>
          <p className="mt-4">
            De asemenea, aveți dreptul de a depune o plângere la Autoritatea Națională
            de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).
          </p>
        </section>
      </div>
    </div>
  )
}
