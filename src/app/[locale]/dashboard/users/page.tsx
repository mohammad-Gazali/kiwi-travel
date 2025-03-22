import { PageHeader } from "@/components/dashboard/page-header"
import { UsersList } from "./_components/users-list"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage user accounts"
        createButtonLabel="Add User"
        createButtonLink="/dashboard/users/create"
      />
      <UsersList />
    </div>
  )
}

