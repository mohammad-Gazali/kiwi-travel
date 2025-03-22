import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const destinations = [
  { id: 1, name: "Rome, Italy", image: "https://placehold.co/300x200" },
  { id: 2, name: "Santorini, Greece", image: "https://placehold.co/300x200" },
  { id: 3, name: "Machu Picchu, Peru", image: "https://placehold.co/300x200" },
  {
    id: 4,
    name: "Bora Bora, French Polynesia",
    image: "https://placehold.co/300x200",
  },
];

export default function PopularDestinations() {
  const t = useTranslations("HomePage.popularDestinations");

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-0">
        <h2 className="mb-8 text-center text-3xl font-bold">
          {t("sectionTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  width={300}
                  height={200}
                  className="h-48 w-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-center">
                  {destination.name}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
