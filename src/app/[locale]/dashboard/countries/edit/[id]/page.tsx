import { PageHeader } from "@/components/dashboard/page-header"
import { CountryForm } from "../../_components/country-form"
import { PageParams } from "@/types/page-params";

export default async function EditCountryPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Country"
        description="Update country information"
        backButtonLink="/dashboard/countries"
      />
      <CountryForm initialData={{
        nameEn: "Test",
        nameRu: "Test"
      }} />
    </div>
  )
}
