import { PageHeader } from "@/components/dashboard/page-header"
import { UserForm } from "../../_components/user-form"

export default async function EditUserPage() {
  const id = 'test';

  return (
    <div className="space-y-6">
      <PageHeader title="Edit User" description="Update user information" backButtonLink="/dashboard/users" />
      <UserForm id={id} />
    </div>
  )
}

