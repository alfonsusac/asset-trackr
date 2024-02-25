import { DataTable } from "@/components/data-table"
import Link from "next/link"
import { vehicleConfigurationColumns } from "../vehicle/columns"
import { prisma } from "@/lib/prisma"
import { tyreConfigurationColumns } from "./columns"
import { MainSection } from "../../components"

export default async function ConfigureAssetPage() {


  const list = await prisma.tyreConfiguration.findMany()

  return (
    <MainSection>
      <h1>Asset Configuration</h1>

      <div className="horizontal-tab">
        <Link href="/configure-assets/vehicle">Vehicle</Link>
        <Link href="/configure-assets/vehicle-body-type">Vehicle Body Type</Link>
        <Link href="/configure-assets/tyre" data-selected={true}>Tyre</Link>
      </div>
      <div>
        <div className="flex gap-2 justify-between">
          <input placeholder="🔎 Search tyre" />
          <Link className="button primary" href="/configure-assets/tyre/create">+ Add Tyre Configuration</Link>
        </div>
        <div className="overflow-auto">
          <div className="flex flex-col w-full mt-4 min-w-[100rem] overflow-auto">
            <DataTable columns={tyreConfigurationColumns} data={list} />
          </div>
        </div>
      </div>
    </MainSection>
  )
}