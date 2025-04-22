import type { Metadata } from "next";
import Image from "next/image";

// TODO: continue this page

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our mission, values, and the team behind TravelEase.",
};

const aboutData = [
  {
    title: "Our Story",
    content:
      "Founded in 2015, TravelEase was born from a passion for travel and a desire to make booking trips easier and more accessible for everyone. What started as a small startup has grown into a trusted travel platform serving thousands of happy customers worldwide.",
  },
  {
    title: "Our Mission",
    content:
      "Our mission is to connect travelers with unforgettable experiences by providing a seamless booking platform with the best prices and exceptional customer service.",
  },
  {
    title: "Our Values",
    content:
      "Customer satisfaction, transparency, innovation, and sustainability are at the core of everything we do. We believe in responsible tourism and work with partners who share our commitment to ethical and sustainable travel practices.",
  },
  {
    title: "Our Team",
    content:
      "Our diverse team of travel enthusiasts and technology experts work together to create the best possible experience for our users. With backgrounds spanning across the globe, we bring a wealth of knowledge and perspectives to help you plan your perfect trip.",
  },
];

const statsData = [
  {
    value: "50,000+",
    label: "Happy Customers",
  },
  {
    value: "100+",
    label: "Countries Covered",
  },
  {
    value: "10,000+",
    label: "Travel Partners",
  },
  {
    value: "24/7",
    label: "Customer Support",
  },
];

export default function AboutPage() {
  return (
    <main className="container mx-auto mt-20 px-4 py-8 lg:grid lg:px-0">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Learn about our mission, values, and the team behind TravelEase.
        </p>
      </div>

      <div className="mb-16 grid items-center gap-12 md:grid-cols-2">
        <div>
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="About TravelEase"
            width={600}
            height={400}
            className="rounded-lg object-cover bg-muted"
          />
        </div>
        <div className="space-y-6">
          {aboutData.slice(0, 2).map((section, index) => (
            <div key={index}>
              <h2 className="mb-3 text-2xl font-semibold">{section.title}</h2>
              <p className="text-muted-foreground">{section.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4">
        {statsData.map((stat, index) => (
          <div key={index} className="rounded-lg bg-muted p-6 text-center">
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="order-2 space-y-6 md:order-1">
          {aboutData.slice(2).map((section, index) => (
            <div key={index}>
              <h2 className="mb-3 text-2xl font-semibold">{section.title}</h2>
              <p className="text-muted-foreground">{section.content}</p>
            </div>
          ))}
        </div>
        <div className="order-1 md:order-2">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Our Team"
            width={600}
            height={400}
            className="rounded-lg object-cover bg-muted"
          />
        </div>
      </div>
    </main>
  );
}
