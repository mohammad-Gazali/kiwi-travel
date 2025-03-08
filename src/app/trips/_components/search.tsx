"use client";

import { useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Users, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";

export function Search() {
  const [date, setDate] = useState<Date>();
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const searchParams = useSearchParams();

  const initialValue = useRef(searchParams.get('search') ?? '');

  const popularDestinations = [
    "Paris",
    "Tokyo",
    "New York",
    "Bali",
    "Rome",
    "London",
    "Sydney",
    "Barcelona",
    "Dubai",
    "Cancun",
  ];

  const regions = [
    "Europe",
    "Asia",
    "North America",
    "South America",
    "Africa",
    "Oceania",
    "Caribbean",
    "Middle East",
  ];

  const tripTypes = [
    "Beach",
    "City",
    "Mountain",
    "Cultural",
    "Adventure",
    "Relaxation",
    "Family",
    "Romantic",
  ];

  return (
    <div className="mb-8">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="destination">Where do you want to go?</Label>
              <Input
                id="destination"
                placeholder="Search destinations, cities, or landmarks"
                className="h-12"
                defaultValue={initialValue.current}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label>When do you want to travel?</Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      disabled={date => date < new Date()}
                      onSelect={date => {
                        setDate(date);
                        setIsCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="travelers">Travelers</Label>
                <div className="relative">
                  <Input
                    id="travelers"
                    type="number"
                    min="1"
                    defaultValue="2"
                    className="h-12 pl-10"
                  />
                  <Users className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="budget">Budget per person</Label>
                <Input
                  id="budget"
                  type="text"
                  placeholder="Enter your budget"
                  className="h-12"
                />
              </div>
            </div>

            <Button
              variant="secondary"
              className="mt-2 h-12"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen ? "Hide Filters" : "Show More Filters"}
            </Button>

            {isFilterOpen && (
              <div className="mt-4 grid gap-6 border-t pt-4">
                <div>
                  <Label className="mb-3 block">
                    Price Range ($ per person)
                  </Label>
                  <div className="px-2">
                    <Slider
                      twoThumbs
                      defaultValue={[500, 5000]}
                      max={10000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Popular Destinations</Label>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                    {popularDestinations.map((destination) => (
                      <div
                        key={destination}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={`destination-${destination}`} />
                        <label
                          htmlFor={`destination-${destination}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {destination}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label className="mb-3 block">Regions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {regions.map((region) => (
                        <div
                          key={region}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`region-${region}`} />
                          <label
                            htmlFor={`region-${region}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {region}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">Trip Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {tripTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={`type-${type}`} />
                          <label
                            htmlFor={`type-${type}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Button className="h-12 w-full text-lg">
        <SearchIcon className="mr-2 h-5 w-5" />
        Search Trips
      </Button>
    </div>
  );
}
