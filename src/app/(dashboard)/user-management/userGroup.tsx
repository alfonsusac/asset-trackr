import { toastAction } from "@/lib/action-toast"
import { UserGroup } from "@prisma/client"
import { createUserGroup, deleteUserGroup } from "./group/action"
import { Input } from "@/components/input"
import { DataTable } from "@/components/data-table"
import Link from "next/link"
import { DeleteAlert } from "@/components/alert"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export function GroupTable(
  props: {
    groups: UserGroup[]
  }
) {
  const router = useRouter()

  return (
    <>
      <div className="flex justify-between mt-4 mb-4">
        <Input className="max-w-56" placeholder="Search" />
        <button className="button primary"
          onClick={() => {
            toastAction(createUserGroup())
          }}
        >
          + Add Group
        </button>
      </div>

      <DataTable<UserGroup, unknown> columns={[
        {
          accessorKey: "name",
          header: "Group Name"
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
            const userGroupID = row.original.id
            return (
              <div className="flex gap-2">

                {
                  row.original.name === "Administrator"
                    ? <></>
                    : <>
                      <Link
                        href={`/user-management/group/edit/${ userGroupID }`}
                        className="p-1 button border-none">
                        ✏️
                      </Link>
                      <DeleteAlert onContinue={
                        async () => {
                          toast(await deleteUserGroup(userGroupID ?? ""))
                          router.refresh()
                        }
                      }>
                        <button className="p-1 outline-red-300 border-none">
                          🗑️
                        </button>
                      </DeleteAlert>
                    </>
                }

              </div>
            )
          }
        }
      ]} data={props.groups} />
    </>
  )
}