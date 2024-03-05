"use client"

import { VehicleTableData } from "./page"
import { DataTable } from "@/components/data-table"
import { DataTableHeader, DataTableSeeDetailLink, DataTableDeleteButton, generateActionColumn } from "@/components/data-table-components"
import { getLocaleDate } from "@/lib/date"
import Link from "next/link"
import { vehicleRoute } from "./links"
import { deleteVehicle } from "./action"

export function VehicleTable(
  props: { data: VehicleTableData[] }
) {

  return (
    <>
      <DataTableHeader>
        <Link href={vehicleRoute.create} className="button primary">+ Add Vehicle</Link>
      </DataTableHeader>
      <DataTable
        className="min-w-[100rem]"
        data={props.data}
        columns={[
          { header: "Created On", accessorFn: data => getLocaleDate(data.createdAt) },
          { header: "Plate No", accessorFn: data => data.plateNo },
          { header: "Vehicle Name", accessorFn: data => data.vehicleName },
          { header: "Brand Name", accessorFn: data => data.brandName },
          { header: "Model", accessorFn: data => data.model },
          { header: "Body Type", accessorFn: data => data.bodyType },
          { header: "Prod. Year", accessorFn: data => data.prodYear + '' },
          { header: "No. of Tyres", accessorFn: data => data.numberOfTyres + '' },
          { header: "Attached With", accessorFn: data => `${ data.attachedWith?.vehicleName } (${ data.attachedWith?.plateNo })` },
          { header: "Assigned To", accessorFn: data => `${ data.assignedTo.firstName } ${ data.assignedTo.lastName }` },
          { header: "Status", accessorFn: data => data.status },
          generateActionColumn<VehicleTableData>((data) => <>
            <DataTableSeeDetailLink href={vehicleRoute.detail(data.id)} />
            <DataTableDeleteButton onContinue={deleteVehicle(data.id)} />
          </>)
        ]}
      />
    </>
  )
}