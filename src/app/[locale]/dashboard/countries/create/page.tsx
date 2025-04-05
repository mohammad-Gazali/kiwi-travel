import { PageHeader } from "@/components/dashboard/page-header"
import { CountryForm } from "../_components/country-form"

export default function NewCountryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Create Country" description="Add a new country" backButtonLink="/dashboard/countries" />
      <CountryForm />
    </div>
  )
}

