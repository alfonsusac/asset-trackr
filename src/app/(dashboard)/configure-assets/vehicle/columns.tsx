"use client"

import { VehicleAssetConfiguration } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import toast from "react-hot-toast"

export const vehicleConfigurationColumns: ColumnDef<VehicleAssetConfiguration>[] = [
  {
    accessorKey: "type",
    header: "Vehicle Type"
  },
  {
    accessorKey: "brand",
    header: "Brand"
  },
  {
    accessorKey: "model",
    header: "Model"
  },
  {
    accessorKey: "engineModel",
    header: "Engine Model"
  },
  {
    accessorKey: "transmissionModel",
    header: "Transmission Model"
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      return <div className="fcenter justify-start">
        {
          row.original.isActive === true
           ? <div className="badge">Active</div>
           : <div className="badge saturate-0">Inactive</div>
        }
      </div>
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Link
            href={`/configure-assets/vehicle/${row.original.id}`}
            className="p-1 button border-none">
            ✏️
          </Link>
          <button
            onClick={() => {
              const id = row.original.id
              toast(JSON.stringify(id))
            }}
            className="p-1 outline-red-300 border-none">
            🗑️
          </button>
        </div>
      )
    }
  },
]