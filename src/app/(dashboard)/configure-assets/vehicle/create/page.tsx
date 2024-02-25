import Link from "next/link"
import { AddVehicleConfigurationForm } from "./form"
import { MainSection } from "@/app/(dashboard)/components"

export default function ConfigureAssetPage() {

  

  return (
    <MainSection subpage>
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <Link href="/configure-assets/vehicle" className="text-blue-500">
          Asset Configuration
        </Link>
        <div>
          {'>'}
        </div>
        <div>
          Add Vehicle Configuration
        </div>
      </div>

      <h1>Add Vehicle Configuration</h1>
      <AddVehicleConfigurationForm />
    </MainSection>
  )
}