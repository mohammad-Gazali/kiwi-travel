import { Search } from "./_components/search";
import { TripResults } from "./_components/trip-results";

export default function Page() {
  return (
    <main className="container mx-auto md:px-0 px-4 py-8 mt-14">
      <Search />
      <TripResults />
    </main>
  );
}
