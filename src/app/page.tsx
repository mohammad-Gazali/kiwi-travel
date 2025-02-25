import Hero from "./_components/hero";
import FeaturedTrips from "./_components/featured-trips";
import PopularDestinations from "./_components/popular-destinations";
import WhyChooseUs from "./_components/why-choose-us";
import Testimonials from "./_components/testimonials";

export default function Page() {
  return (
    <main className="flex-grow">
      <Hero />
      <FeaturedTrips />
      <PopularDestinations />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
