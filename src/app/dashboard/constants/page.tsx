import { PageHeader } from "@/components/dashboard/page-header"
import { ConstantsList } from "./_components/constants-list"

export default function ConstantsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Website Constants"
        description="Manage website configuration"
        createButtonLabel="Add Constant"
        createButtonLink="/dashboard/constants/create"
      />
      <ConstantsList />
    </div>
  )
}

