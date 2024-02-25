import { PageProps } from "@/lib/next"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { DeleteVehicleConfigurationButton } from "./client"
import { MainSection } from "@/app/(dashboard)/components"

export default async function ConfigureAssetPage(page: PageProps<['id']>) {

  const { id } = page.params

  const data = await prisma.vehicleAssetConfiguration.findUnique({ where: { id } })

  const header = <div className="flex items-center gap-2 text-sm text-neutral-400">
    <Link href="/configure-assets/vehicle" className="text-blue-500">
      Asset Configuration
    </Link>
    <span>{'>'}</span>
    <span>View Vehicle Configuration</span>
    <span>{'>'}</span>
    <span>{id}</span>
  </div>

  if (!data) return (
    <MainSection subpage>
      {header}

      <h1>View Vehicle Configuration</h1>
      <div className="card min-h-40 fcenter">
        Vehicle Configuration Not Found
      </div>
    </MainSection>
  )


  return (
    <MainSection subpage>
      {header}

      <h1>View Vehicle Configuration</h1>

      <div className="flex gap-2 text-sm">
        <Link href={`${ id }/edit`} className="button">✏️ Edit</Link>
        <DeleteVehicleConfigurationButton id={id} />
      </div>

      <div className="card card-big">
        <header>Vehicle Information</header>
        <hr />
        <table className="fields">
          <tbody>
            <tr>
              <th>Vehicle Type</th>
              <td>{data.type}</td>
            </tr>
            <tr>
              <th>Brand Name</th>
              <td>{data.brand}</td>
            </tr>
            <tr>
              <th>Model</th>
              <td>{data.model}</td>
            </tr>
            <tr>
              <th>Engine Model</th>
              <td>{data.engineModel}</td>
            </tr>
            <tr>
              <th>Transmission Model</th>
              <td>{data.transmissionModel}</td>
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

