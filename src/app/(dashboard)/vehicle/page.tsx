import { prisma } from "@/lib/prisma"
import { MainSection } from "../components"
import { Vehicle } from "@prisma/client"
import { VehicleTable } from "./client"

export default async function VehicleListPage() {

  const vehicles = await prisma.vehicle.findMany({
    include: {
      attachedWith: { select: { vehicleName: true, plateNo: true, id: true } },
      assignedTo: { select: { id: true, firstName: true, lastName: true } }
    },
    orderBy: { createdAt: "asc" }
  })

  return (
    <MainSection>
      <h1>Vehicle List</h1>
      <VehicleTable data={vehicles} />
    </MainSection>
  )

}

export type VehicleTableData = Vehicle & {
  attachedWith: {
    id: string
    plateNo: string
    vehicleName: string
  } | null
  assignedTo: {
    id: string
    firstName: string
    lastName: string
  }
}