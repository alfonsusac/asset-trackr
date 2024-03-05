import { MainSection } from "@/app/(dashboard)/components"
import { Breadcrumb } from "@/components/breadcrumbs"
import { ResourceNotFound } from "@/components/not-found"
import { PageProps } from "@/lib/next"
import { prisma } from "@/lib/prisma"
import { EditUserForm } from "./form"

export default async function EditUserPage(props: PageProps<['id']>) {

  const id = props.params.id
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      location: { select: { name: true, id: true } },
      userGroup: { select: { name: true, id: true } },
    }
  })
  if (!user) {
    return <ResourceNotFound
      text="User Not Fonud"
      backHref='/user-management'
    />
  }
  const groups = await prisma.userGroup.findMany()
  const locations = await prisma.location.findMany()
  return (
    <MainSection subpage>
      <div className="max-w-screen-sm mx-auto space-y-4">
        <Breadcrumb links={[
          { label: "User", href: "/user-management" },
          { label: `${ user.firstName } ${ user.lastName }`, href: `/user-management/user/${ id }` },
          { label: "Add New User" }
        ]} />
        <h1>Edit user</h1>
        <EditUserForm
          data={user}
          groups={groups}
          locations={locations}
        />
      </div>
    </MainSection>
  )
}