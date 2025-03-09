import { PageHeader } from "@/components/dashboard/page-header"
import { UserForm } from "../_components/user-form"

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Create User" description="Add a new user account" backButtonLink="/dashboard/users" />
      <UserForm />
    </div>
  )
}

