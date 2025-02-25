import { Shield, ThumbsUp, Headphones } from "lucide-react"

const reasons = [
  {
    icon: <Shield className="h-12 w-12 text-primary" />,
    title: "Safe and Secure",
    description: "We prioritize your safety with trusted partners and 24/7 support.",
  },
  {
    icon: <ThumbsUp className="h-12 w-12 text-primary" />,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it and give you an additional discount.",
  },
  {
    icon: <Headphones className="h-12 w-12 text-primary" />,
    title: "Exceptional Customer Service",
    description: "Our dedicated team is always ready to assist you before, during, and after your trip.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-accent dark:bg-accent/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

