import { MainSection } from "@/app/(dashboard)/components"
import { Breadcrumb } from "@/components/breadcrumbs"
import { ResourceNotFound } from "@/components/not-found"
import { getLocaleDate } from "@/lib/date"
import { PageProps } from "@/lib/next"
import { prisma } from "@/lib/prisma"
import { SVGProps } from "react"
import { AddOrEditSubLocationDialog, DeleteLocationDialog, DeleteSubLocationDialog } from "./client"
import { PhMapPinFill } from "@/components/icons"


export default async function LocationDetailPage(props: PageProps<['id']>) {

  const { id } = props.params
  const location = await prisma.location.findUnique({ where: { id }, include: { subLocations: true } })

  if (!location) {
    return <ResourceNotFound text="Location not found" backHref="/locations"/>
  }

  const { name, address, description, created_at, status, subLocations } = location

  return (
    <MainSection subpage>
      <Breadcrumb links={[{ href: "/locations", label: "Locations" }, { label: location.name }]} />
      <h1>Location Detail</h1>
      <div className="card p-2 gap-2 inline-flex rounded-xl">
        <button className="ghost">✏️ Edit</button>
        <DeleteLocationDialog id={id}>
          <button className="ghost destroy">🗑️ Delete</button>
        </DeleteLocationDialog>
      </div>
      <div className="flex gap-2">
        <div className="flex-[2_1_0] mr-0 flex flex-col gap-2">
          <div className="card card-big">
            <header>Information</header>
            <hr />
            <table className="fields [&_th]:w-36">
              <tbody>
                <tr>
                  <th>Created Date</th><td>{getLocaleDate(created_at)}</td>
                </tr>
                <tr>
                  <th>Status</th><td>
                    {
                      status === "Available"
                        ? <div className="badge">Available</div>
                        : <div className="badge saturate-0">Closed</div>
                    }
                  </td>
                </tr>
                <tr>
                  <th>Location Name</th><td>{name}</td>
                </tr>
                <tr>
                  <th>Address</th><td>{address}</td>
                </tr>
                <tr>
                  <th>Description</th><td>{description}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card card-big">
            <header>Assets at Location</header>
            <hr />
          </div>
        </div>
        <div className="card card-big min-h-96 fcol pb-2 flex-1 self-start">
          <header>Sub Locations <span className="font-normal text-blue-600">({subLocations.length})</span></header>
          <hr />
          <div className="grow">
            {
              subLocations.map(subLocation => (
                <div key={subLocation.id} className="flex gap-2 items-center py-2">
                  <PhMapPinFill className="h-[1lh] w-[1lh] text-blue-600 flex-none" />
                  <div className="grow">
                    <div className="leading-none">{subLocation.name}</div>
                    <div className="text-sm text-neutral-500">{subLocation.description}</div>
                  </div>
                  <div className="flex gap-2 flex-none">
                    <AddOrEditSubLocationDialog
                      locationID={id}
                      data={subLocation}
                    >
                      <button className="ghost icon">✏️</button>
                    </AddOrEditSubLocationDialog>
                    <DeleteSubLocationDialog id={subLocation.id}>
                      <button className="ghost icon destroy">🗑️</button>
                    </DeleteSubLocationDialog>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="fcenter fcol items-stretch py-1 pt-2">
            <hr className="" />
            <AddOrEditSubLocationDialog locationID={id}>
              <button className="grow ghost !text-blue-600 !border-t !border-t-neutral-300">
                + Add Sub Location
              </button>
            </AddOrEditSubLocationDialog>
          </div>
        </div>
      </div>
    </MainSection>
  )

}
