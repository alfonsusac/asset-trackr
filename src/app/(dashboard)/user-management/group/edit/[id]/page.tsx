import { MainSection } from "@/app/(dashboard)/components"
import { PageProps } from "@/lib/next"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { EditUserGroupForm, PermissionSettings } from "./form"

export default async function UserGroupDetailPage(page: PageProps<['id']>) {
  const { id } = page.params
  const usergroup = await prisma.userGroup.findUnique({ where: { id } })

  if (!usergroup) {
    return (
      <MainSection subpage>
        <div className="h-full fcenter fcol gap-4">
          ID Not Found
          <Link href="/user-management?tab=groups" className="button">Back to User Group List</Link>
        </div>
      </MainSection>
    )
  }

  return (
    <MainSection subpage>
      <Link href="/user-management?tab=groups" className="button ghost lineunder">{'<-'} Back to User Group List</Link>
      <h1>Edit Group User: {usergroup.name}</h1>
      <EditUserGroupForm data={usergroup} />
      <PermissionSettings userGroup={usergroup} />
    </MainSection>
  )
}