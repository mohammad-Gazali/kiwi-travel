import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

// TODO: add 

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    comment:
      "TravelEase made planning my European vacation a breeze. Their customer service is top-notch!",
    rating: 5,
  },
  {
    name: "David Lee",
    location: "Sydney, Australia",
    comment:
      "I've used TravelEase for multiple trips, and they never disappoint. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emma Garcia",
    location: "London, UK",
    comment:
      "The best travel booking site I've ever used. Great deals and smooth experiences every time.",
    rating: 4,
  },
];

export default function Testimonials() {
  const t = useTranslations("HomePage.testimonials");

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-0">
        <h2 className="mb-8 text-center text-3xl font-bold">
          {t("sectionTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location}
                </p>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{testimonial.comment}</p>
                <div className="flex">
                  {Array(testimonial.rating)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current text-yellow-400"
                      />
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
