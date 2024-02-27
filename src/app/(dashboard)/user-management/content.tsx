"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { User, UserGroup } from "@prisma/client"
import { useQueryState } from "nuqs"
import { GroupTable } from "./userGroup"
import { UserTable } from "./user"
import { UserTableInfo } from "./page"

export default function UserManagementPageContent(
  props: {
    groups: UserGroup[]
    users: UserTableInfo
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
          <UserTable users={props.users} />
        </TabsContent>
        <TabsContent value="groups">
          <GroupTable groups={props.groups} />
        </TabsContent>
      </Tabs>
    </>
  )
}

