"use client"

import { useState } from "react"
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    joinedDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Customer",
    status: "Active",
    joinedDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Customer",
    status: "Inactive",
    joinedDate: "2023-03-10",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Manager",
    status: "Active",
    joinedDate: "2023-04-05",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Customer",
    status: "Active",
    joinedDate: "2023-05-12",
  },
  {
    id: "6",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Customer",
    status: "Active",
    joinedDate: "2023-06-18",
  },
  {
    id: "7",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "Manager",
    status: "Active",
    joinedDate: "2023-07-22",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    role: "Customer",
    status: "Inactive",
    joinedDate: "2023-08-05",
  },
  {
    id: "9",
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "Customer",
    status: "Active",
    joinedDate: "2023-09-14",
  },
  {
    id: "10",
    name: "Patricia Moore",
    email: "patricia.moore@example.com",
    role: "Admin",
    status: "Active",
    joinedDate: "2023-10-30",
  },
  {
    id: "11",
    name: "Thomas Taylor",
    email: "thomas.taylor@example.com",
    role: "Customer",
    status: "Active",
    joinedDate: "2023-11-11",
  },
  {
    id: "12",
    name: "Jennifer White",
    email: "jennifer.white@example.com",
    role: "Customer",
    status: "Inactive",
    joinedDate: "2023-12-07",
  },
]

type User = {
  id: string
  name: string
  email: string
  role: string
  status: string
  joinedDate: string
}

export function UsersList() {
  const [users, setUsers] = useState(mockUsers)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete))
      setUserToDelete(null)
      setDialogOpen(false)
    }
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue<string>("status")
        return <Badge variant={status === "Active" ? "default" : "secondary"}>{status}</Badge>
      },
    },
    {
      accessorKey: "joinedDate",
      header: "Joined Date",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/users/${user.id}/edit`}>
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setUserToDelete(user.id)
                setDialogOpen(true)
              }}
            >
              <Trash className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <DataTable columns={columns} data={users} searchColumn="name" searchPlaceholder="Search users..." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

