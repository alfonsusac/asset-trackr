
import { MainSection } from "@/app/(dashboard)/components"
import { Breadcrumb } from "@/components/breadcrumbs"
import { AddNewUserForm } from "./form"
import { prisma } from "@/lib/prisma"

export default async function CreateUserPage() {

  const groups = await prisma.userGroup.findMany()
  const locations = await prisma.location.findMany()

  return (
    <MainSection subpage>
      <div className="max-w-screen-sm mx-auto space-y-4">
        <Breadcrumb links={[{ label: "User", href: "/user-management" }, { label: "Add New User" }]} />
        <h1>Add New user</h1>
        <AddNewUserForm
          groups={groups}
          locations={locations}
        />
      </div>
    </MainSection>
  )
}