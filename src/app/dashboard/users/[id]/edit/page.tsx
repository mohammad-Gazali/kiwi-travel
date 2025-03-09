import { PageHeader } from "@/components/dashboard/page-header"
import { UserForm } from "../../_components/user-form"

export default function EditUserPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Edit User" description="Update user information" backButtonLink="/dashboard/users" />
      <UserForm id={params.id} />
    </div>
  )
}

