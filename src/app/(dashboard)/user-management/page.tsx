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

  return (
    <MainSection>
      <h1>User Management</h1>
      <UserManagementPageContent groups={groups} />
    </MainSection>
  )
}