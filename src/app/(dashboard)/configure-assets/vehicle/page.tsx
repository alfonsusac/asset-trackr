import { DataTable } from "@/components/data-table"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { vehicleConfigurationColumns } from "./columns"
import { MainSection } from "../../components"

export default async function ConfigureAssetPage() {

  const list = await prisma.vehicleAssetConfiguration.findMany()

  return (
    <MainSection>
      <h1>Asset Configuration</h1>

      <div className="horizontal-tab">
        <Link href="/configure-assets/vehicle" data-selected={true}>Vehicle</Link>
        <Link href="/configure-assets/vehicle-body-type">Vehicle Body Type</Link>
        <Link href="/configure-assets/tyre">Tyre</Link>
      </div>

      <div>
        <div className="flex gap-2 justify-between">
          <input placeholder="🔎 Search vehicle" />
          <Link className="button primary" href="/configure-assets/vehicle/create">+ Add Vehicle Configuration</Link>
        </div>

        <div className="flex flex-col w-full mt-4">
          <DataTable columns={vehicleConfigurationColumns} data={list} />
        </div>
      </div>
    </MainSection>
  )
}