import { Search } from "./_components/search";
import { SearchProvider } from "./_components/search-provider";
import { TripResults } from "./_components/trip-results";
import SchemaProduct from '@/components/SchemaProduct';

export default async function TripsPage() {
  const trips = await getAllTrips(); // твоя функция получения данных

  return (
    <>
      {trips.length > 0 && (
        <SchemaProduct
          name={trips[0].title}
          description={trips[0].description}
          url={`https://karimtor.com/ru/trips/${trips[0].id}`}
          price={trips[0].price}
          currency="USD"
          images={trips[0].images}
          available={trips[0].isAvailable}
        />
      )}

      {/* вывод всех экскурсий */}
    </>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const awaitedSearchParams = await searchParams;

  const initialSearchValue =
    typeof awaitedSearchParams.search === "string"
      ? awaitedSearchParams.search
      : awaitedSearchParams.search instanceof Array
        ? awaitedSearchParams.search[0]
        : undefined;

  return (
    <main className="container flex flex-col-reverse lg:grid grid-cols-3 gap-4 mx-auto mt-14 px-4 py-8 lg:px-0">
      <SearchProvider>
        <TripResults />
        <Search initialValue={initialSearchValue} />
      </SearchProvider>
    </main>
  );
}
