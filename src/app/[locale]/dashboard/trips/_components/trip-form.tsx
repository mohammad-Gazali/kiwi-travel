"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock trip data for edit mode
const mockTrip = {
  id: "1",
  title: "Paris Adventure",
  destination: "Paris, France",
  duration: "7",
  price: "1299",
  description:
    "Experience the magic of Paris with this 7-day adventure. Visit iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
  image: "https://placehold.co/300x200",
}

// Mock destinations for select dropdown
const mockDestinations = [
  { id: "1", name: "Paris, France" },
  { id: "2", name: "Tokyo, Japan" },
  { id: "3", name: "New York, USA" },
  { id: "4", name: "Bali, Indonesia" },
  { id: "5", name: "Nairobi, Kenya" },
  { id: "6", name: "Athens, Greece" },
]

interface TripFormProps {
  id?: string
}

export function TripForm({ id }: TripFormProps) {
  const router = useRouter()
  const isEditMode = !!id

  // Initialize form with mock data if in edit mode
  const [formData, setFormData] = useState(
    isEditMode
      ? mockTrip
      : {
          id: "",
          title: "",
          destination: "",
          duration: "",
          price: "",
          description: "",
          image: "",
        },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    // In a real app, you would save the data to your backend here

    // Navigate back to trips list
    router.push("/dashboard/trips")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Trip" : "Create Trip"}</CardTitle>
          <CardDescription>
            {isEditMode ? "Update the details of an existing trip" : "Add a new trip to your catalog"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3">
            <Label htmlFor="title">Trip Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="destination">Destination</Label>
            <Select value={formData.destination} onValueChange={(value) => handleSelectChange("destination", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a destination" />
              </SelectTrigger>
              <SelectContent>
                {mockDestinations.map((destination) => (
                  <SelectItem key={destination.id} value={destination.name}>
                    {destination.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="grid gap-3">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div className="mt-2 aspect-video w-full max-w-md overflow-hidden rounded-md border">
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Trip preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/trips")}>
            Cancel
          </Button>
          <Button type="submit">{isEditMode ? "Update Trip" : "Create Trip"}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

