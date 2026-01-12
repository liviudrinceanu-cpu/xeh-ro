import { Metadata } from 'next'
import Link from 'next/link'
import { getAllBrands } from '@/data/brands'
import { getProductsByBrand } from '@/data/products'

export const metadata: Metadata = {
  title: 'Branduri - RM Gastro & REDFOX | XEH.ro',
  description: 'Alege între brandurile noastre de echipamente HoReCa: RM Gastro pentru bucătării profesionale mari și REDFOX pentru raport calitate-preț excelent.',
}

export default function BranduriPage() {
  const brands = getAllBrands()

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Alege Brandul Potrivit
            </h1>
            <p className="text-xl text-gray-200">
              Oferim echipamente profesionale de la două branduri de încredere,
              fiecare cu puncte forte distincte pentru nevoile tale.
            </p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {brands.map((brand) => {
              const productCount = getProductsByBrand(brand.slug).length

              return (
                <Link
                  key={brand.slug}
                  href={`/branduri/${brand.slug}`}
                  className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Background with brand color */}
                  <div
                    className="absolute inset-0 opacity-95"
                    style={{ backgroundColor: brand.color }}
                  />

                  {/* Content */}
                  <div className="relative p-8 md:p-12 text-white min-h-[400px] flex flex-col">
                    {/* Brand Name */}
                    <div className="mb-6">
                      <h2 className="text-4xl md:text-5xl font-bold mb-2">
                        {brand.shortName}
                      </h2>
                      <p className="text-xl opacity-90">{brand.name}</p>
                    </div>

                    {/* Tagline */}
                    <div
                      className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                      style={{ backgroundColor: brand.accentColor }}
                    >
                      {brand.tagline}
                    </div>

                    {/* Description */}
                    <p className="text-gray-100 text-lg leading-relaxed mb-8 flex-grow">
                      {brand.description}
                    </p>

                    {/* Stats & CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200">
                        {productCount} produse disponibile
                      </span>
                      <span className="inline-flex items-center gap-2 font-semibold group-hover:translate-x-2 transition-transform">
                        Explorează
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Decorative element */}
                  <div
                    className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-10"
                    style={{ backgroundColor: '#ffffff' }}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">
              Compară Brandurile
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 px-6 text-left text-gray-600 font-semibold">Caracteristică</th>
                    <th className="py-4 px-6 text-center">
                      <span className="inline-block px-4 py-1 rounded-lg text-white font-bold" style={{ backgroundColor: '#1a1a1a' }}>
                        RM Gastro
                      </span>
                    </th>
                    <th className="py-4 px-6 text-center">
                      <span className="inline-block px-4 py-1 rounded-lg text-white font-bold" style={{ backgroundColor: '#DC143C' }}>
                        REDFOX
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">Segment</td>
                    <td className="py-4 px-6 text-center">Premium / High-End</td>
                    <td className="py-4 px-6 text-center">Standard / Entry</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">Ideal pentru</td>
                    <td className="py-4 px-6 text-center">Bucătării mari, Hoteluri 4-5*</td>
                    <td className="py-4 px-6 text-center">Restaurante, Cafenele, Fast-food</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">Material</td>
                    <td className="py-4 px-6 text-center">Inox AISI 304</td>
                    <td className="py-4 px-6 text-center">Inox AISI 430/304</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">Garanție</td>
                    <td className="py-4 px-6 text-center">2-3 ani</td>
                    <td className="py-4 px-6 text-center">1-2 ani</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-6 text-gray-700">Preț</td>
                    <td className="py-4 px-6 text-center">Premium</td>
                    <td className="py-4 px-6 text-center">Competitiv</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nu ești sigur ce brand să alegi?
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Consultanții noștri te pot ajuta să alegi echipamentele potrivite
              pentru bugetul și nevoile tale specifice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+40123456789"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Sună Acum
              </a>
              <Link
                href="/cerere-oferta"
                className="btn-accent px-8 py-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Cere Consultanță
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
