"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";;

const featuredTrips = [
  {
    id: 1,
    title: "Paris Getaway",
    image: "https://placehold.co/300x200",
    rating: 4.8,
    price: 1299,
  },
  {
    id: 2,
    title: "Tokyo Adventure",
    image: "https://placehold.co/300x200",
    rating: 4.9,
    price: 1599,
  },
  {
    id: 3,
    title: "Bali Retreat",
    image: "https://placehold.co/300x200",
    rating: 4.7,
    price: 999,
  },
  {
    id: 4,
    title: "New York City Tour",
    image: "https://placehold.co/300x200",
    rating: 4.6,
    price: 1399,
  },
  {
    id: 5,
    title: "African Safari",
    image: "https://placehold.co/300x200",
    rating: 4.9,
    price: 2499,
  },
];

export default function FeaturedTrips() {
  const t = useTranslations("HomePage.featuredTrips");

  return (
    <section className="bg-accent dark:bg-accent/20 py-16">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold">{t('sectionTitle')}</h2>
        <Carousel className="sm:px-12">
          <CarouselContent className="p-4 sm:pl-1">
            {featuredTrips.map((trip) => (
              <CarouselItem
                className="basis-10/12 pl-2 sm:basis-full md:pl-4 lg:basis-1/2 xl:basis-1/3"
                key={trip.id}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      width={300}
                      height={200}
                      className="h-48 w-full object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle>{trip.title}</CardTitle>
                    <div className="mt-2 flex items-center">
                      <Star className="h-5 w-5 fill-current text-yellow-400" />
                      <span className="ml-1 text-sm">{trip.rating}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-4 pt-0">
                    <span className="text-lg font-bold">${trip.price}</span>
                    <Link href={`/trips/${trip.id}`}>
                      <Button size="sm">{t('buttonLabel')}</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 hidden sm:flex" />
          <CarouselNext className="right-0 hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
