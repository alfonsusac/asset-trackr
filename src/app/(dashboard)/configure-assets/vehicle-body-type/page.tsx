import { DataTable } from "@/components/data-table"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { vehicleBodyTypeConfigurationColumns } from "./columns"
import { MainSection } from "../../components"

export default async function ConfigureAssetPage() {

  const list = await prisma.vehicleBodyTypeAssetConfiguration.findMany()

  return (
    <MainSection>
      <h1>Asset Configuration</h1>


      <div className="horizontal-tab">
        <Link href="/configure-assets/vehicle">Vehicle</Link>
        <Link href="/configure-assets/vehicle-body-type" data-selected={true}>Vehicle Body Type</Link>
        <Link href="/configure-assets/tyre">Tyre</Link>
      </div>

      <div>
        <div className="flex gap-2 justify-between">
          <input placeholder="🔎 Search vehicle" />
          <Link className="button primary" href="/configure-assets/vehicle-body-type/create">+ Add Vehicle Body Type Configuration</Link>
        </div>
        <div className="flex flex-col w-full mt-4">
          <DataTable columns={vehicleBodyTypeConfigurationColumns} data={list} />
        </div>
      </div>
    </MainSection>
  )
}