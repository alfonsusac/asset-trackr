import { toastAction } from "@/lib/action-toast"
import { Input } from "@/components/input"
import { DataTable } from "@/components/data-table"
import Link from "next/link"
import { DeleteAlert } from "@/components/alert"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { deleteUser } from "./user/action"

export function UserTable(
  props: {
    users: User[]
  }
) {
  const router = useRouter()

  return (
    <>
      <div className="flex justify-between mt-4 mb-4">
        <Input className="max-w-56" placeholder="Search" />
        <Link href="/user-management/createUser" className="button primary">
          + Add User
        </Link>
      </div>

      <DataTable<User, unknown> columns={[
        {
          accessorKey: "name",
          header: "User Name"
        },
        {
          accessorKey: "description",
          header: "Description",
        },
        {
          id: 'activeUser',
          header: "Active User",
        },
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => {
            const userUserID = row.original.id
            return (
              <div className="flex gap-2">
                <Link
                  href={`/user-management/group/edit/${ userUserID }`}
                  className="p-1 button border-none">
                  ✏️
                </Link>
                <DeleteAlert onContinue={
                  async () => {
                    toast(await deleteUser(userUserID ?? ""))
                    router.refresh()
                  }
                }>
                  <button className="p-1 outline-red-300 border-none">
                    🗑️
                  </button>
                </DeleteAlert>
              </div>
            )
          }
        }
      ]} data={props.users} />
    </>
  )
}