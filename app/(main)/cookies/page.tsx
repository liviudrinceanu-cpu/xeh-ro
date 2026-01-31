import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politica de Cookies | XEH.ro',
  description: 'Politica de utilizare a cookies pe site-ul XEH.ro. Informații despre tipurile de cookies și cum le gestionăm.',
  openGraph: {
    title: 'Politica de Cookies | XEH.ro',
    description: 'Politica de utilizare a cookies pe site-ul XEH.ro.',
    url: 'https://www.xeh.ro/cookies',
    siteName: 'XEH.ro',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Politica de Cookies&subtitle=XEH.ro - eXpert Echipamente Horeca',
      width: 1200,
      height: 630,
      alt: 'Politica de Cookies - XEH.ro',
    }],
    locale: 'ro_RO',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.xeh.ro/cookies',
  },
}

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-600 mb-8">
        Politica de Cookies
      </h1>

      <div className="prose prose-lg max-w-none text-gray-600">
        <p className="text-lg text-gray-500 mb-8">
          Ultima actualizare: Ianuarie 2026
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">1. Ce sunt Cookies?</h2>
          <p>
            Cookies sunt fișiere text mici stocate pe dispozitivul dumneavoastră atunci
            când vizitați un site web. Acestea permit site-ului să rețină informații despre
            vizita dumneavoastră, cum ar fi preferințele de limbă și alte setări, facilitând
            următoarele vizite și făcând site-ul mai util pentru dumneavoastră.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">2. Tipuri de Cookies Utilizate</h2>

          <h3 className="text-xl font-semibold text-gray-600 mt-6 mb-3">Cookies Esențiale</h3>
          <p>
            Necesare pentru funcționarea de bază a site-ului. Fără acestea, site-ul nu
            poate funcționa corect. Includ cookies pentru:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Autentificare și sesiune utilizator</li>
            <li>Preferințe de securitate</li>
            <li>Funcționalitatea coșului de cerere ofertă</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-600 mt-6 mb-3">Cookies de Analiză</h3>
          <p>
            Ne ajută să înțelegem cum utilizați site-ul pentru a-l îmbunătăți.
            Colectează informații anonime despre:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Paginile vizitate și timpul petrecut</li>
            <li>Sursele de trafic</li>
            <li>Erorile întâmpinate</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-600 mt-6 mb-3">Cookies de Marketing</h3>
          <p>
            Utilizate pentru a vă oferi conținut relevant și a măsura eficiența
            campaniilor publicitare. În prezent, XEH.ro utilizează:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Ahrefs Analytics - pentru analiza SEO și performanței site-ului</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">3. Cookies Terțe Părți</h2>
          <p>
            Site-ul nostru poate încărca conținut de la terțe părți care pot seta
            propriile cookies:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Cloudinary:</strong> pentru încărcarea optimizată a imaginilor produselor</li>
            <li><strong>Supabase:</strong> pentru autentificare și funcționalități backend</li>
            <li><strong>Ahrefs:</strong> pentru analiză și statistici</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">4. Gestionarea Cookies</h2>
          <p>
            Puteți controla și șterge cookies din setările browserului dumneavoastră.
            Rețineți că dezactivarea unor cookies poate afecta funcționalitatea site-ului.
          </p>
          <p className="mt-4">Instrucțiuni pentru browsere populare:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              <a href="https://support.google.com/chrome/answer/95647"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-crimson hover:text-crimson-dark">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/ro/kb/activarea-si-dezactivarea-cookie-urilor"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-crimson hover:text-crimson-dark">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/ro-ro/guide/safari/sfri11471/mac"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-crimson hover:text-crimson-dark">
                Safari
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/ro-ro/microsoft-edge/ștergerea-cookie-urilor-în-microsoft-edge"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-crimson hover:text-crimson-dark">
                Microsoft Edge
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">5. Durata de Stocare</h2>
          <p>
            Cookies pot fi de sesiune (șterse când închideți browserul) sau persistente
            (rămân pe dispozitiv pentru o perioadă determinată):
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Cookies de sesiune:</strong> șterse la închiderea browserului</li>
            <li><strong>Cookies de autentificare:</strong> până la 30 de zile</li>
            <li><strong>Cookies de preferințe:</strong> până la 1 an</li>
            <li><strong>Cookies de analiză:</strong> până la 2 ani</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">6. Actualizări ale Politicii</h2>
          <p>
            Această politică poate fi actualizată periodic. Vă încurajăm să o
            consultați regulat pentru a fi la curent cu modul în care protejăm
            informațiile dumneavoastră.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">7. Contact</h2>
          <p>
            Pentru întrebări despre utilizarea cookies pe XEH.ro:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Email: <a href="mailto:privacy@xeh.ro" className="text-crimson hover:text-crimson-dark">privacy@xeh.ro</a></li>
            <li>Telefon: <a href="tel:+40371232404" className="text-crimson hover:text-crimson-dark">0371 232 404</a></li>
          </ul>
        </section>

        <section className="mt-12 p-6 bg-gray-50 rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-600 mb-3">Mai multe informații</h2>
          <p className="text-gray-500">
            Consultați și{' '}
            <a href="/confidentialitate" className="text-crimson hover:text-crimson-dark">
              Politica de Confidențialitate
            </a>{' '}
            și{' '}
            <a href="/termeni" className="text-crimson hover:text-crimson-dark">
              Termenii și Condițiile
            </a>{' '}
            pentru informații complete despre cum protejăm datele dumneavoastră.
          </p>
        </section>
      </div>
    </div>
  )
}
