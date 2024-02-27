"use client"

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/dropdown"
import { PhFunnel } from "@/components/icons"
import { DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { SVGProps, useState } from "react"

export default function WorkOrderListTable() {

  const [filter, setFilter] = useState("")

  return (
    <>
      <div className="fcenter justify-between">

        <div className="fcenter gap-2">


          <div className="card p-1.5 rounded-lg">
            🔎
            <input className="border-none outline-none" placeholder="Search work orders" />
          </div>

          <FitlerDropdown filterlist={{ "test": "Hello"}} />
        </div>

        <button className="primary">+ Create Ticket</button>

      </div>

    </>
  )
}


function FitlerDropdown(
  props: {
    filterlist: {
      [key: string]: string
    },
    value?: string,
    onValueChange?: (to: string) => string
  }
) {
  const [filter, setFilter] = useState("")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center">
        <PhFunnel />
        Filter
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={props.value ?? filter} onValueChange={props.onValueChange ?? setFilter}>
          {
            Object.entries(props.filterlist).map(
              ([key, value]) =>
              <DropdownMenuRadioItem key={key} value={key}>{value}</DropdownMenuRadioItem>
            )
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

