import { PageHeader } from "@/components/dashboard/page-header"
import { ConstantForm } from "../../_components/constant-form"
import { PageParams } from "@/types/page-params";

export default async function EditConstantPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Constant" description="Update website constant" backButtonLink="/dashboard/constants" />
      <ConstantForm id={id} />
    </div>
  )
}

