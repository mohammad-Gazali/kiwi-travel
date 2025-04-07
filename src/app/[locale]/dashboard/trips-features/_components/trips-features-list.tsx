"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import type { Feature } from "../page";

// Mock features for select dropdown
const mockFeatures = [
  { id: 1, nameEn: "Private beach access", nameRu: "Private beach access" },
  { id: 2, nameEn: "Infinity pool", nameRu: "Infinity pool" },
  { id: 3, nameEn: "Daily breakfast", nameRu: "Daily breakfast" },
  { id: 4, nameEn: "Airport transfers", nameRu: "Airport transfers" },
  {
    id: 5,
    nameEn: "Complimentary spa session",
    nameRu: "Complimentary spa session",
  },
  { id: 6, nameEn: "24/7 concierge service", nameRu: "24/7 concierge service" },
  {
    id: 7,
    nameEn: "WiFi throughout the property",
    nameRu: "WiFi throughout the property",
  },
  { id: 8, nameEn: "Air conditioning", nameRu: "Air conditioning" },
];

interface TripsFeaturesListProps {
  openEditDialog: (initial: Feature) => void;
}

export function TripsFeaturesList({ openEditDialog }: TripsFeaturesListProps) {
  const [featureToDelete, setFeatureToDelete] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    // TODO: handle delete
    if (featureToDelete) {
      setFeatureToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const columns: ColumnDef<Feature>[] = [
    {
      accessorKey: "nameEn",
      header: "English Name",
    },
    {
      accessorKey: "nameRu",
      header: "Russian Name",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const feature = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => {
              openEditDialog(feature);
            }}>
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setFeatureToDelete(feature.id);
                setDeleteDialogOpen(true);
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
    <>
      <DataTable columns={columns} data={mockFeatures} />
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this feature? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
