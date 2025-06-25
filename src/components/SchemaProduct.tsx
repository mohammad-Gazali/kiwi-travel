'use client';

import Script from 'next/script';

interface SchemaProductProps {
  name: string;
  description: string;
  url: string;
  price: number;
  currency: string;
  images: string[];
  available?: boolean;
}

export default function SchemaProduct({
  name,
  description,
  url,
  price,
  currency,
  images,
  available = true,
}: SchemaProductProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description,
    image: images,
    offers: {
      "@type": "Offer",
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url,
    },
    touristType: "IndividualOrGroup",
    touristAgency: {
      "@type": "TravelAgency",
      name: "Karimtor",
      url: "https://karimtor.com",
    },
  };

  return (
    <Script
      id="schema-tour"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}