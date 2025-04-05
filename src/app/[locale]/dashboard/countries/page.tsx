import { PageHeader } from "@/components/dashboard/page-header"
import { CountriesList } from "./_components/countries-list"

export default function CountriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Countries"
        description="Manage your countries"
        createButtonLabel="Add Country"
        createButtonLink="/dashboard/countries/create"
      />
      <CountriesList />
    </div>
  )
}