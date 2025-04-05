"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@/i18n/routing";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

interface Country {
  id: number;
  nameEn: string;
  nameRu: string;
}

const mockCountries: Country[] = [
  { id: 1, nameEn: "United States", nameRu: "Соединенные Штаты" },
  { id: 2, nameEn: "Russia", nameRu: "Россия" },
  { id: 3, nameEn: "Japan", nameRu: "Япония" },
  { id: 4, nameEn: "Germany", nameRu: "Германия" },
  { id: 5, nameEn: "France", nameRu: "Франция" },
  { id: 6, nameEn: "China", nameRu: "Китай" },
  { id: 7, nameEn: "Brazil", nameRu: "Бразилия" },
  { id: 8, nameEn: "Italy", nameRu: "Италия" },
  { id: 9, nameEn: "India", nameRu: "Индия" },
  { id: 10, nameEn: "Egypt", nameRu: "Египет" },
];

export function CountriesList() {
  const [countryToDelete, setCountryToDelete] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    // TODO: handle delete
    if (countryToDelete) {
      setCountryToDelete(null);
      setDialogOpen(false);
    }
  };

  const columns: ColumnDef<Country>[] = [
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
        const country = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/countries/edit/${country.id}`}>
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setCountryToDelete(country.id);
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
    <>
      <DataTable columns={columns} data={mockCountries} />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this country? This action cannot be undone.
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
    </>
  );
}
