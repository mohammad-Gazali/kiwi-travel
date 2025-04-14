"use client";

import { TripSearchFormValues } from "@/validators/trip-schema";
import { createContext, useState } from "react";

export const SearchContext = createContext({
  searchValue: {} as TripSearchFormValues,
  setSearchValue: (value: TripSearchFormValues) => {},
  isExtraFiltersOpen: false,
  setIsExtraFiltersOpen: (value: boolean) => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchValue, setSearchValue] = useState<TripSearchFormValues>({});
  const [isExtraFiltersOpen, setIsExtraFiltersOpen] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        isExtraFiltersOpen,
        setIsExtraFiltersOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
