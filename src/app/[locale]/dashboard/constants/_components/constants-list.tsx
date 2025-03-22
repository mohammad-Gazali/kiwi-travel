"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"

// Mock data for website constants
const mockConstants = [
  {
    id: "1",
    key: "SITE_NAME",
    value: "Kiwi Travel",
    description: "Website name displayed in the header and title",
    category: "General",
  },
  {
    id: "2",
    key: "CONTACT_EMAIL",
    value: "support@kiwitravel.com",
    description: "Primary contact email for customer inquiries",
    category: "Contact",
  },
  {
    id: "3",
    key: "CONTACT_PHONE",
    value: "+1 (555) 123-4567",
    description: "Customer support phone number",
    category: "Contact",
  },
  {
    id: "4",
    key: "FACEBOOK_URL",
    value: "https://facebook.com/kiwitravel",
    description: "Facebook page URL",
    category: "Social Media",
  },
  {
    id: "5",
    key: "INSTAGRAM_URL",
    value: "https://instagram.com/kiwitravel",
    description: "Instagram profile URL",
    category: "Social Media",
  },
  {
    id: "6",
    key: "BOOKING_FEE_PERCENTAGE",
    value: "2.5",
    description: "Percentage fee applied to bookings",
    category: "Pricing",
  },
  {
    id: "7",
    key: "CURRENCY",
    value: "USD",
    description: "Default currency for prices",
    category: "Pricing",
  },
  {
    id: "8",
    key: "TWITTER_URL",
    value: "https://twitter.com/kiwitravel",
    description: "Twitter profile URL",
    category: "Social Media",
  },
]

type Constant = {
  id: string
  key: string
  value: string
  description: string
  category: string
}

export function ConstantsList() {
  const [constants, setConstants] = useState(mockConstants)
  const [constantToDelete, setConstantToDelete] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDelete = () => {
    if (constantToDelete) {
      setConstants(constants.filter((constant) => constant.id !== constantToDelete))
      setConstantToDelete(null)
      setDialogOpen(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "General":
        return "default"
      case "Contact":
        return "secondary"
      case "Social Media":
        return "outline"
      case "Pricing":
        return "destructive"
      default:
        return "default"
    }
  }

  const columns: ColumnDef<Constant>[] = [
    {
      accessorKey: "key",
      header: "Key",
      cell: ({ row }) => {
        return <span className="font-mono font-medium">{row.getValue("key")}</span>
      },
    },
    {
      accessorKey: "value",
      header: "Value",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return <div className="max-w-[300px] truncate">{row.getValue("description")}</div>
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue<string>("category")
        return <Badge variant={getCategoryColor(category)}>{category}</Badge>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const constant = row.original
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/constants/${constant.id}/edit`}>
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setConstantToDelete(constant.id)
                setDialogOpen(true)
              }}
            >
              <Trash className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <DataTable columns={columns} data={constants} searchColumn="key" searchPlaceholder="Search constants..." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this constant? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

