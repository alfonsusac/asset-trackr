import Link from "next/link"
import { AddTyreConfigurationForm } from "./form"
import { MainSection } from "@/app/(dashboard)/components"

export default function ConfigureAssetPage() {



  return (
    <MainSection subpage>
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <Link href="/configure-assets/tyre" className="text-blue-500">
          Asset Configuration
        </Link>
        <div>
          {'>'}
        </div>
        <div>
          Add Tyre Configuration
        </div>
      </div>

      <h1>Add Tyre Configuration</h1>
      <AddTyreConfigurationForm />
    </MainSection>
  )
}