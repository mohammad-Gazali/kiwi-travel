import { Search } from "./_components/search";
import { TripResults } from "./_components/trip-results";

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
      <TripResults />
      <Search initialValue={initialSearchValue} />
    </main>
  );
}
