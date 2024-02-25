import { PageProps } from "@/lib/next"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { DeleteVehicleBodyTypeConfigurationButton } from "./client"
import { MainSection } from "@/app/(dashboard)/components"

export default async function VehicleBodyTypeConfigureAssetPage(page: PageProps<['id']>) {

  const { id } = page.params

  const data = await prisma.vehicleBodyTypeAssetConfiguration.findUnique({ where: { id } })

  const header = <div className="flex items-center gap-2 text-sm text-neutral-400">
    <Link href="/configure-assets/vehicle-body-type" className="text-blue-500">
      Asset Configuration
    </Link>
    <span>{'>'}</span>
    <span>View Vehicle Body Type Configuration</span>
    <span>{'>'}</span>
    <span>{id}</span>
  </div>

  if (!data) return (
    <MainSection subpage>
      {header}

      <h1>View Vehicle Body Type Configuration</h1>
      <div className="card min-h-40 fcenter">
        Vehicle Body Type Configuration Not Found
      </div>
    </MainSection>
  )


  return (
    <MainSection subpage>
      {header}

      <h1>View Vehicle Body Type Configuration</h1>

      <div className="flex gap-2 text-sm">
        <Link href={`${ id }/edit`} className="button">✏️ Edit</Link>
        <DeleteVehicleBodyTypeConfigurationButton id={id} />
      </div>

      <div className="card card-big">
        <header>Vehicle Information</header>
        <hr />
        <table className="fields">
          <tbody>
            <tr>
              <th>Vehicle Body Type Type</th>
              <td>{data.name}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>
                {
                  data.isActive
                    ? <div className="badge">active</div>
                    : <div className="badge saturate">inactive</div>
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainSection>
  )
}

