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
import { Switch } from "@/components/ui/switch"

// Mock destination data for edit mode
const mockDestination = {
  id: "1",
  name: "Paris",
  country: "France",
  continent: "Europe",
  description: "The City of Light, known for its stunning architecture, art museums, and romantic atmosphere.",
  popular: true,
  image: "https://placehold.co/300x200",
}

// Mock continents for select dropdown
const continents = ["Africa", "Antarctica", "Asia", "Europe", "North America", "Oceania", "South America"]

interface DestinationFormProps {
  id?: string
}

export function DestinationForm({ id }: DestinationFormProps) {
  const router = useRouter()
  const isEditMode = !!id

  // Initialize form with mock data if in edit mode
  const [formData, setFormData] = useState(
    isEditMode
      ? mockDestination
      : {
          id: "",
          name: "",
          country: "",
          continent: "",
          description: "",
          popular: false,
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

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    // In a real app, you would save the data to your backend here

    // Navigate back to destinations list
    router.push("/dashboard/destinations")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Destination" : "Create Destination"}</CardTitle>
          <CardDescription>
            {isEditMode ? "Update the details of an existing destination" : "Add a new destination to your catalog"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Destination Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="continent">Continent</Label>
            <Select value={formData.continent} onValueChange={(value) => handleSelectChange("continent", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a continent" />
              </SelectTrigger>
              <SelectContent>
                {continents.map((continent) => (
                  <SelectItem key={continent} value={continent}>
                    {continent}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

          <div className="flex items-center gap-3">
            <Label htmlFor="popular">Popular Destination</Label>
            <Switch
              id="popular"
              checked={formData.popular}
              onCheckedChange={(checked) => handleSwitchChange("popular", checked)}
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
                  alt="Destination preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/destinations")}>
            Cancel
          </Button>
          <Button type="submit">{isEditMode ? "Update Destination" : "Create Destination"}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

