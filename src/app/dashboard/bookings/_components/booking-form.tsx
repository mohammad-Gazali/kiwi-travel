"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock booking data for edit mode
const mockBooking = {
  id: "1",
  tripId: "1",
  customerId: "1",
  bookingDate: "2023-06-15",
  travelDate: "2023-08-10",
  status: "Confirmed",
  amount: "1299",
  notes: "Customer requested window seat on flights.",
}

// Mock trips for select dropdown
const mockTrips = [
  { id: "1", name: "Paris Adventure" },
  { id: "2", name: "Tokyo Explorer" },
  { id: "3", name: "New York City Break" },
  { id: "4", name: "Bali Retreat" },
  { id: "5", name: "Safari Adventure" },
]

// Mock customers for select dropdown
const mockCustomers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Robert Johnson" },
  { id: "4", name: "Emily Davis" },
  { id: "5", name: "Michael Wilson" },
]

interface BookingFormProps {
  id?: string
}

export function BookingForm({ id }: BookingFormProps) {
  const router = useRouter()
  const isEditMode = !!id

  // Initialize form with mock data if in edit mode
  const [formData, setFormData] = useState(
    isEditMode
      ? mockBooking
      : {
          id: "",
          tripId: "",
          customerId: "",
          bookingDate: new Date().toISOString().split("T")[0],
          travelDate: "",
          status: "Pending",
          amount: "",
          notes: "",
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

    // Navigate back to bookings list
    router.push("/dashboard/bookings")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Booking" : "Create Booking"}</CardTitle>
          <CardDescription>
            {isEditMode ? "Update the details of an existing booking" : "Add a new booking to the system"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3">
            <Label htmlFor="tripId">Trip</Label>
            <Select value={formData.tripId} onValueChange={(value) => handleSelectChange("tripId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a trip" />
              </SelectTrigger>
              <SelectContent>
                {mockTrips.map((trip) => (
                  <SelectItem key={trip.id} value={trip.id}>
                    {trip.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="customerId">Customer</Label>
            <Select value={formData.customerId} onValueChange={(value) => handleSelectChange("customerId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {mockCustomers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="grid gap-3">
              <Label htmlFor="bookingDate">Booking Date</Label>
              <Input
                id="bookingDate"
                name="bookingDate"
                type="date"
                value={formData.bookingDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="travelDate">Travel Date</Label>
              <Input
                id="travelDate"
                name="travelDate"
                type="date"
                value={formData.travelDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requests or notes"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/bookings")}>
            Cancel
          </Button>
          <Button type="submit">{isEditMode ? "Update Booking" : "Create Booking"}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

