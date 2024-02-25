"use client"

import { TyreConfiguration } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import toast from "react-hot-toast"

export const tyreConfigurationColumns: ColumnDef<TyreConfiguration>[] = [
  {
    accessorKey: "brand",
    header: "Brand"
  },
  {
    accessorKey: "pattern",
    header: "Pattern/Type"
  },
  {
    cell: ({ row }) => {
      return `${row.original.sectionWidth} ${row.original.construction} ${row.original.rimDiameter}`
    },
    header: "Aspect Ratio / Construction / Rim Diameter"
  },
  {
    accessorKey: "originalThreadDepth",
    header: "Original Thread Depth"
  },
  {
    accessorKey: "tubeType",
    header: "Tube Type"
  },
  {
    accessorKey: "plyRating",
    header: "Ply Rating"
  },
  {
    accessorKey: "loadIndex",
    header: "Load Index"
  },
  {
    accessorKey: "speedSymbol",
    header: "Speed Symbol"
  },
  {
    accessorKey: "traCode",
    header: "TRA Code (OTR)"
  },
  {
    accessorKey: "starRating",
    header: "Star Rating (OTR)"
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Link
            href={`/configure-assets/tyre/${ row.original.id }`}
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