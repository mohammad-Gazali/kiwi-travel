import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    comment: "TravelEase made planning my European vacation a breeze. Their customer service is top-notch!",
    rating: 5,
  },
  {
    name: "David Lee",
    location: "Sydney, Australia",
    comment: "I've used TravelEase for multiple trips, and they never disappoint. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emma Garcia",
    location: "London, UK",
    comment: "The best travel booking site I've ever used. Great deals and smooth experiences every time.",
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container md:px-0 px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Travelers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{testimonial.comment}</p>
                <div className="flex">
                  {Array(testimonial.rating).fill(null).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

