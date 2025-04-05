"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";

// Mock data for destinations
const mockDestinations = [
  {
    id: 1,
    nameEn: "Paris",
    nameRu: "Paris",
    country: {
      id: 1,
      name: "France",
    },
    isPopular: true,
    image: "https://placehold.co/300x200",
  },
  {
    id: 2,
    nameEn: "Tokyo",
    nameRu: "Tokyo",
    country: {
      id: 2,
      name: "Japan",
    },
    isPopular: true,
    image: "https://placehold.co/300x200",
  },
  {
    id: 3,
    nameEn: "New York",
    nameRu: "New York",
    country: {
      id: 3,
      name: "USA",
    },
    isPopular: true,
    image: "https://placehold.co/300x200",
  },
  {
    id: 4,
    nameEn: "Bali",
    nameRu: "Bali",
    country: {
      id: 4,
      name: "Indonesia",
    },
    isPopular: false,
    image: "https://placehold.co/300x200",
  },
  {
    id: 5,
    nameEn: "Nairobi",
    nameRu: "Nairobi",
    country: {
      id: 5,
      name: "Kenya",
    },
    isPopular: false,
    image: "https://placehold.co/300x200",
  },
  {
    id: 6,
    nameEn: "Athens",
    nameRu: "Athens",
    country: {
      id: 6,
      name: "Greece",
    },
    isPopular: false,
    image: "https://placehold.co/300x200",
  },
  {
    id: 7,
    nameEn: "Barcelona",
    nameRu: "Barcelona",
    country: {
      id: 7,
      name: "Spain",
    },
    isPopular: true,
    image: "https://placehold.co/300x200",
  },
  {
    id: 8,
    nameEn: "Zurich",
    nameRu: "Zurich",
    country: {
      id: 8,
      name: "Switzerland",
    },
    isPopular: false,
    image: "https://placehold.co/300x200",
  },
];

type Destination = {
  id: number;
  nameEn: string;
  nameRu: string;
  country: {
    id: number;
    name: string;
  };
  isPopular: boolean;
  image: string;
};

export function DestinationsList() {
  const [destinationToDelete, setDestinationToDelete] = useState<number | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    // TODO: handle delete

    if (destinationToDelete) {
      setDestinationToDelete(null);
      setDialogOpen(false);
    }
  };

  const columns: ColumnDef<Destination>[] = [
    {
      accessorKey: "nameEn",
      header: "Destination",
      cell: ({ row }) => {
        const destination = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-md">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.nameEn}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-medium">{destination.nameEn}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "nameRu",
      header: "Russian name",
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => row.original.country.name,
    },
    {
      accessorKey: "isPopular",
      header: "Status",
      cell: ({ row }) =>
        row.original.isPopular ? (
          <Badge>Popular</Badge>
        ) : (
          <Badge variant="secondary">Regular</Badge>
        ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const destination = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/destinations/edit/${destination.id}`}>
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setDestinationToDelete(destination.id);
                setDialogOpen(true);
              }}
            >
              <Trash className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={mockDestinations}
        searchColumn="nameEn"
        searchPlaceholder="Search destinations..."
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this destination? This action
              cannot be undone.
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
  );
}
