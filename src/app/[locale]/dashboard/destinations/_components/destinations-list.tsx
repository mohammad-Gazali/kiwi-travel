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
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";

export function DestinationsList() {
  const { toast } = useToast();

  const [destinationToDelete, setDestinationToDelete] = useState<number | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, refetch } = api.destination.adminList.useQuery();
  const { mutate: deleteDestination } = api.tripFeature.adminDelete.useMutation({
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: ({ message }) => {
        toast({
          title: "Success",
          description: message,
        });
        refetch();
      },
    });

  type Destination = NonNullable<typeof data>[number];

  const handleDelete = () => {
    if (destinationToDelete) {
      deleteDestination(destinationToDelete)
    }

    setDestinationToDelete(null);
    setDialogOpen(false);
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
                src={destination.imageUrl || "/placeholder.svg"}
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
      cell: ({ row }) => row.original.country.nameEn,
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
        data={data ?? []}
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
