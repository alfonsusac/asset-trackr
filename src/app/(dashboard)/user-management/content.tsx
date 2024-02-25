"use client"

import { DeleteAlert } from "@/components/alert"
import { DataTable } from "@/components/data-table"
import { Input } from "@/components/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { UserGroup } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { createUserGroup, deleteUserGroup } from "./usergroup/action"
import { useQueryState } from "nuqs"

export default function UserManagementPageContent(
  props: {
    groups: UserGroup[]
  }
) {
  const [tab, setTab] = useQueryState('tab')

  return (
    <>
      <Tabs defaultValue="users" value={tab || "users"} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger asChild value="users">
            <div>
              Users
            </div>
          </TabsTrigger>
          <TabsTrigger asChild value="groups">
            <div>
              Groups & Permissions
            </div>
          </TabsTrigger>
        </TabsList>

        <br />
        <br />

        <TabsContent value="users">
          <UserTable />
        </TabsContent>

        <TabsContent value="groups">
          <GroupTable groups={props.groups} />
        </TabsContent>
      </Tabs>
    </>
  )
}

function UserTable() {

  return (
    <>
      <div className="flex justify-between">
        <Input className="max-w-56" placeholder="Search" />
        <button className="button primary"
          onClick={() => {
            toast.promise(createUserGroup(), {
              loading: "",
              error: "",
              success: (data) => data
            })
          }}
        >
          + Add User
        </button>
      </div>
      <hr />
      <DataTable columns={[]} data={[]} />
    </>
  )
}


function GroupTable(
  props: {
    groups: UserGroup[]
  }
) {

  const router = useRouter()

  return (
    <>
      <div className="flex justify-between my-8">
        <Input className="max-w-56" placeholder="Search" />
        <button className="button primary"
          onClick={() => {
            toast.promise(createUserGroup(), {
              loading: "",
              error: "",
              success: (data) => data
            })
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
            const userGroupName = row.original.name

            return (
              <div className="flex gap-2">

                {
                  userGroupName === "Administrator"
                    ? <></>
                    : <>
                      <Link
                        href={`/user-management/groups/${ userGroupName }`}
                        className="p-1 button border-none">
                        ✏️
                      </Link>
                      <DeleteAlert onContinue={
                        async () => {
                          toast(await deleteUserGroup(userGroupName ?? ""))
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