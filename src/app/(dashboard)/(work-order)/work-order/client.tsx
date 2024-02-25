"use client"

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/dropdown"
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


export function PhFunnel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M230.6 49.53A15.81 15.81 0 0 0 216 40H40a16 16 0 0 0-11.81 26.76l.08.09L96 139.17V216a16 16 0 0 0 24.87 13.32l32-21.34a16 16 0 0 0 7.13-13.32v-55.49l67.74-72.32l.08-.09a15.8 15.8 0 0 0 2.78-17.23m-82.26 78.75a15.92 15.92 0 0 0-4.34 10.89v55.49L112 216v-76.83a15.92 15.92 0 0 0-4.32-10.94L40 56h176Z"></path></svg>
  )
}