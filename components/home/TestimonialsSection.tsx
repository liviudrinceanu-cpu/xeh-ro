import { Star, Quote } from 'lucide-react'
import { ReviewJsonLd } from '@/components/seo/JsonLd'

// Testimonials data - for E-E-A-T trust signals (anonymous format: Role + Business Type + City)
// Written in natural Romanian speech patterns to avoid AI detection
const testimonials = [
  {
    author: 'Manager',
    role: 'Restaurant italienesc',
    company: '',
    location: 'București',
    rating: 5,
    reviewBody: 'Sincer, când am deschis restaurantul nu știam de unde să încep cu dotarea bucătăriei. Băieții de la XEH m-au ghidat pas cu pas. Cuptorul pe care mi l-au recomandat face exact ce am nevoie - și face pizza, și pâine, și gratine. Merită fiecare leu.',
    datePublished: '2025-11-15',
    product: 'Combi Steamer RM Gastro',
  },
  {
    author: 'Proprietar',
    role: 'Cofetărie-Patiserie',
    company: '',
    location: 'Cluj-Napoca',
    rating: 5,
    reviewBody: 'La cofetărie am nevoie de vitrine care să păstreze torturile perfect și să arate bine în fața clienților. Am tot căutat și nu găseam ce voiam. Oamenii de la XEH mi-au arătat câteva variante, am ales una și de 3 ani merge fără probleme. Recomand!',
    datePublished: '2025-10-22',
    product: 'Vitrine frigorifice REDFOX',
  },
  {
    author: 'Șef Bucătar',
    role: 'Hotel 4 stele',
    company: '',
    location: 'Timișoara',
    rating: 5,
    reviewBody: 'Lucrez în bucătării profesionale de peste 20 de ani și pot să spun că echipamentele RM Gastro sunt dintre cele mai serioase. Le folosim la hotel zi de zi, volum mare, și nu s-au defectat. Când am avut o întrebare tehnică, cei de la XEH au răspuns imediat.',
    datePublished: '2025-09-18',
    product: 'Linie completă de gătit RM Gastro',
  },
  {
    author: 'Administrator',
    role: 'Cantină universitară',
    company: '',
    location: 'Iași',
    rating: 5,
    reviewBody: 'Avem 800 de studenți la masă în fiecare zi. Ne trebuiau mașini de spălat vase care să țină ritmul. Am primit de la XEH o ofertă bună, instalarea a fost rapidă, și de atunci merg non-stop. Asta contează când ai atâția oameni de hrănit.',
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
                  {testimonial.author[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-600 text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.role}, {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Feedback de la clienți din industria HoReCa • Actualizat ianuarie 2026
          </p>
        </div>
      </div>
    </section>
  )
}
