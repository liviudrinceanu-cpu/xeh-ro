import Link from 'next/link'
import { categories } from '@/data/categories'
import { getNewProducts } from '@/data/products'
import { getAllBrands } from '@/data/brands'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const newProducts = getNewProducts(4)
  const brands = getAllBrands()

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              eXpert Echipamente Horeca
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-4">
              <strong className="text-white">XEH</strong> = eXpert Echipamente Horeca
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Furnizor de echipamente profesionale pentru industria HoReCa din România.
              Calitate superioară, prețuri competitive și servicii complete pentru restaurante,
              hoteluri și cafenele.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/branduri" className="btn-accent text-lg px-8 py-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Alege Brandul
              </Link>
              <Link href="/cerere-oferta" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Cere Ofertă
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Selection Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Alege Brandul Potrivit</h2>
            <p className="section-subtitle mx-auto">
              Oferim echipamente profesionale de la două branduri de încredere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {brands.map((brand) => (
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
                <div className="relative p-8 md:p-10 text-white min-h-[320px] flex flex-col">
                  {/* Brand Name */}
                  <div className="mb-4">
                    <h3 className="text-4xl md:text-5xl font-bold mb-2">
                      {brand.shortName}
                    </h3>
                    <p className="text-lg opacity-90">{brand.name}</p>
                  </div>

                  {/* Tagline */}
                  <div
                    className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit"
                    style={{ backgroundColor: brand.accentColor }}
                  >
                    {brand.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-gray-100 leading-relaxed mb-6 flex-grow line-clamp-3">
                    {brand.description}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 font-semibold group-hover:translate-x-2 transition-transform">
                    Explorează produsele
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>

                {/* Decorative element */}
                <div
                  className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-10"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/branduri" className="btn-outline">
              Compară brandurile
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Calitate Garantată</h3>
              <p className="text-gray-600">Echipamente de la branduri recunoscute cu garanție extinsă și suport tehnic.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Livrare Rapidă</h3>
              <p className="text-gray-600">Livrare în toată România cu montaj și punere în funcțiune inclusă.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Suport Expert</h3>
              <p className="text-gray-600">Echipă de specialiști disponibilă pentru consultanță și asistență tehnică.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Produse Noi</h2>
            <p className="section-subtitle mx-auto">
              Cele mai recente echipamente adăugate în catalog
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/categorii" className="btn-outline">
              Vezi toate produsele
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Categorii de Echipamente</h2>
            <p className="section-subtitle mx-auto">
              Explorează gama completă de echipamente profesionale pentru bucătăria ta
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.slug}
                href={`/categorii/${category.slug}`}
                className="card group"
              >
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-4">
                    <span className="text-white font-semibold text-lg">{category.name}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm line-clamp-2">{category.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.productCount} produse</span>
                    <span className="text-primary font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Vezi produse
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/categorii" className="btn-outline">
              Vezi toate categoriile
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ai nevoie de o ofertă personalizată?
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Contactează-ne pentru o consultanță gratuită și o ofertă adaptată nevoilor tale.
              Echipa noastră de experți te va ghida în alegerea echipamentelor potrivite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+40123456789"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +40 123 456 789
              </a>
              <Link
                href="/cerere-oferta"
                className="btn-accent px-8 py-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Trimite Cerere Ofertă
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
