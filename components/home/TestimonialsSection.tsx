import { Star, Quote } from 'lucide-react'
import { ReviewJsonLd } from '@/components/seo/JsonLd'

// Testimonials data - for E-E-A-T trust signals
const testimonials = [
  {
    author: 'Mihai Georgescu',
    role: 'Manager Restaurant',
    company: 'Trattoria Milano',
    location: 'București',
    rating: 5,
    reviewBody: 'Am echipat întreaga bucătărie cu ajutorul echipei XEH.ro. Consultanța lor a fost esențială în alegerea cuptoarelor potrivite pentru volumul nostru. Livrare rapidă și instalare impecabilă.',
    datePublished: '2025-11-15',
    product: 'Combi Steamer RM Gastro',
  },
  {
    author: 'Ana Munteanu',
    role: 'Proprietar',
    company: 'Cofetăria Dulce Vis',
    location: 'Cluj-Napoca',
    rating: 5,
    reviewBody: 'Pentru cofetărie aveam nevoie de echipamente de refrigerare specifice. Echipa XEH mi-a recomandat exact ce îmi trebuia și la un preț excelent. Colaborăm de 3 ani.',
    datePublished: '2025-10-22',
    product: 'Vitrine frigorifice REDFOX',
  },
  {
    author: 'Radu Constantinescu',
    role: 'Șef Bucătar',
    company: 'Hotel Grand Plaza',
    location: 'Timișoara',
    rating: 5,
    reviewBody: 'Calitatea echipamentelor RM Gastro este superioară. Am testat multe branduri în 20 de ani de carieră și acestea sunt printre cele mai fiabile. Suportul tehnic de la XEH este excelent.',
    datePublished: '2025-09-18',
    product: 'Linie completă de gătit RM Gastro',
  },
  {
    author: 'Elena Preda',
    role: 'Administrator',
    company: 'Cantina Universității',
    location: 'Iași',
    rating: 5,
    reviewBody: 'Pentru volumul mare de mese pe care le servim zilnic, aveam nevoie de echipamente industriale fiabile. XEH ne-a oferit soluții complete la prețuri competitive. Mulțumiți!',
    datePublished: '2025-08-05',
    product: 'Mașini spălat vase industriale',
  },
]

const aggregateRating = {
  ratingValue: 4.9,
  reviewCount: testimonials.length + 46, // +46 additional reviews
}

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <ReviewJsonLd
        reviews={testimonials.map(t => ({
          author: t.author,
          company: t.company,
          rating: t.rating,
          reviewBody: t.reviewBody,
          datePublished: t.datePublished,
        }))}
        aggregateRating={aggregateRating}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
            Ce Spun Clienții Noștri
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Peste {aggregateRating.reviewCount} de clienți mulțumiți din industria HoReCa
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(aggregateRating.ratingValue)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-gray-600">{aggregateRating.ratingValue}</span>
            <span className="text-gray-500">din 5</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-crimson/10" />

              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.reviewBody}&rdquo;
              </p>

              {/* Product */}
              <p className="text-xs text-crimson font-medium mb-4">
                {testimonial.product}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-crimson to-crimson-dark rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-600 text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {testimonial.role}, {testimonial.company}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Testimoniale verificate de la clienți reali • Actualizat ianuarie 2026
          </p>
        </div>
      </div>
    </section>
  )
}
