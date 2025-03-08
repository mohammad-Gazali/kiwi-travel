"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SearchForm = () => {
  const router = useRouter();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        const searchValue = e.currentTarget["search"].value;

        router.push(searchValue ? `/trips?search=${searchValue}` : '/trips');
      }}
      className="flex items-center space-x-4"
    >
      <div className="relative flex-grow">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
        <Input
          name="search"
          type="text"
          placeholder="Where do you want to go?"
          className="w-full pl-10 text-inherit"
        />
      </div>
      <Button type="submit" className="flex-shrink-0">
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
