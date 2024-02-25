import { PageProps } from "@/lib/next"
import Link from "next/link"
import { EditTyreConfigurationForm } from "./form"
import { prisma } from "@/lib/prisma"
import { MainSection } from "@/app/(dashboard)/components"

export default async function ConfigureAssetPage({ params: { id } }: PageProps<['id']>) {

  const header = <div className="flex items-center gap-2 text-sm text-neutral-400">
    <Link href="/configure-assets/tyre" className="text-blue-500">
      Asset Configuration
    </Link>
    <span>{'>'}</span>
    <span>Edit Tyre Configuration</span>
    <span>{'>'}</span>
    <span>{id}</span>
  </div>

  const data = await prisma.tyreConfiguration.findUnique({ where: { id } })

  if (!data) return (
    <MainSection subpage>
      {header}

      <h1>View Tyre Configuration</h1>
      <div className="card min-h-40 fcenter">
        Tyre Configuration Not Found
      </div>
    </MainSection>
  )

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
          Edit Tyre Configuration
        </div>
      </div>

      <h1>Edit Tyre Configuration</h1>
      <EditTyreConfigurationForm data={data} />
    </MainSection>
  )
}