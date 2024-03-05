import { toastAction } from "@/lib/action-toast"
import { Input } from "@/components/input"
import { DataTable } from "@/components/data-table"
import Link from "next/link"
import { DeleteAlert } from "@/components/alert"
import { useRouter } from "next/navigation"
import { deleteUser } from "./user/action"
import { UserTableInfo } from "./page"
import { ReactNode } from "react"
import { useQueryState } from "nuqs"
import { DataTableHeader } from "@/components/data-table-components"



export function UserTable(
  props: {
    users: UserTableInfo
  }
) {
  const router = useRouter()

  return (
    <>
      <DataTableHeader>
        <Link href="/user-management/create-user" className="button primary">
          + Add User
        </Link>
      </DataTableHeader>

      <DataTable columns={[
        { header: "User Name", accessorFn: data => `${ data.firstName } ${ data.lastName }` },
        { header: "Employee ID", accessorFn: data => data.employeeId },
        { header: "Role", accessorFn: data => data.position },
        { header: "Location", accessorFn: data => data.location?.name },
        { header: "Groups", accessorFn: data => data.userGroup.name },
        { header: "Status", cell: _ => <div className="badge">Active</div> },
        {
          header: "Actions",
          id: "actions",
          cell: ({ row }) => {
            const userUserID = row.original.id
            return (
              <div className="flex gap-2">
                <Link
                  href={`/user-management/user/${ userUserID }`}
                  className="p-1 button border-none">
                  ✏️
                </Link>
                <DeleteAlert onContinue={
                  async () => {
                    toastAction(deleteUser(userUserID))
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