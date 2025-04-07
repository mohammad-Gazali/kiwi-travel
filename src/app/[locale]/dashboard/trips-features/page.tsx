"use client";

import { PageHeader } from "@/components/dashboard/page-header";
import { TripsFeaturesList } from "./_components/trips-features-list";
import { useState } from "react";
import { TripFeatureFormDialog } from "./_components/trip-feature-form-dialog";

export interface Feature {
  id: number;
  nameEn: string;
  nameRu: string;
}

export default function TripsFeaturesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<Feature | null>(null);

  const openDialog = (initial?: Feature) => {
    setDialogOpen(true);
    setDialogData(initial ?? null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trips Features"
        description="Manage trips features"
        createButtonLabel="Add Feature"
        onCreateClick={() => openDialog()}
      />
      <TripsFeaturesList openEditDialog={openDialog} />
      <TripFeatureFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        feature={dialogData ?? undefined}
      />
    </div>
  );
}
