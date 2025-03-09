import { PageHeader } from "@/components/dashboard/page-header"
import { UserForm } from "../../_components/user-form"
import { PageParams } from "@/types/page-params";

export default async function EditUserPage({ params }: PageParams<{ id: string }>) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <PageHeader title="Edit User" description="Update user information" backButtonLink="/dashboard/users" />
      <UserForm id={id} />
    </div>
  )
}

