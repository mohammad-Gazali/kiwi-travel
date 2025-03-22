import { PageHeader } from "@/components/dashboard/page-header"
import { ConstantForm } from "../_components/constant-form"

export default function NewConstantPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Constant"
        description="Add a new website constant"
        backButtonLink="/dashboard/constants"
      />
      <ConstantForm />
    </div>
  )
}

