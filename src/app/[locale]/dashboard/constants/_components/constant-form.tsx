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

// Mock constant data for edit mode
const mockConstant = {
  id: "1",
  key: "SITE_NAME",
  value: "Kiwi Travel",
  description: "Website name displayed in the header and title",
  category: "General",
}

// Categories for select dropdown
const categories = ["General", "Contact", "Social Media", "Pricing", "SEO", "API"]

interface ConstantFormProps {
  id?: string
}

export function ConstantForm({ id }: ConstantFormProps) {
  const router = useRouter()
  const isEditMode = !!id

  // Initialize form with mock data if in edit mode
  const [formData, setFormData] = useState(
    isEditMode
      ? mockConstant
      : {
          id: "",
          key: "",
          value: "",
          description: "",
          category: "",
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

    // Navigate back to constants list
    router.push("/dashboard/constants")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Constant" : "Create Constant"}</CardTitle>
          <CardDescription>
            {isEditMode ? "Update the details of an existing website constant" : "Add a new constant to the system"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              name="key"
              value={formData.key}
              onChange={handleChange}
              placeholder="SITE_NAME"
              className="font-mono"
              required
            />
            <p className="text-xs text-muted-foreground">
              Use uppercase letters and underscores for keys (e.g., SITE_NAME)
            </p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="value">Value</Label>
            <Input id="value" name="value" value={formData.value} onChange={handleChange} required />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/constants")}>
            Cancel
          </Button>
          <Button type="submit">{isEditMode ? "Update Constant" : "Create Constant"}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

