import { prisma } from "@/lib/prisma"
import { MainSection } from "../../components"
import LocationTable from "./table"

export default async function ManageLocationPage() {

  const locations = await prisma.location.findMany({
    orderBy: { created_at: "asc" }
  })

  return (
    <MainSection>
      <h1>Locations</h1>
      <LocationTable locations={locations} />
    </MainSection>
  )
}