import { PageHeader } from "@/components/dashboard/page-header"
import { ConstantForm } from "../../_components/constant-form"

export default async function EditConstantPage() {
  const id = 'test';

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Constant" description="Update website constant" backButtonLink="/dashboard/constants" />
      <ConstantForm id={id} />
    </div>
  )
}

