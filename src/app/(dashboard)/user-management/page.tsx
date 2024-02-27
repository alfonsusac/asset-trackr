import { prisma } from "@/lib/prisma"
import { MainSection } from "../components"
import UserManagementPageContent from "./content"

export default async function UserManagementPage() {

  const groups = await prisma.userGroup.findMany()

  if (!groups.find(g => g.name === 'Administrator')) {
    const admin = await prisma.userGroup.create({
      data: {
        name: "Administrator",
        description: "For Admin (full access)",
        permissions: ['FullAccess']
      }
    })
    groups.unshift(admin)
  }

  const users = await prisma.user.findMany({
    include: {
      location: { select: { name: true } },
      userGroup: { select: { name: true } }
    }
  })


  return (
    <MainSection>
      <h1>User Management</h1>
      <UserManagementPageContent
        groups={groups}
        users={users} />
    </MainSection>
  )
}

export type UserTableInfo = ({
  userGroup: {
    name: string
  }
  location: {
    name: string
  } | null
} & {
  id: string
  firstName: string
  lastName: string
  position: string | null
  employeeId: string | null
  phoneNumber: string | null
  email: string
  password: string
  userGroupId: string
  locationId: string
})[]