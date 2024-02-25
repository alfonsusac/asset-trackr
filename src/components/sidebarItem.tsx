"use client"

import { cn } from "@/lib/cn"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode, useState } from "react"

export function SidebarItem(
  props: {
    label: string,
    icon?: ReactNode,
    startsWith?: string,
    href?: string
  }
) {

  const param = usePathname()
  const selected = param.startsWith(props.startsWith ?? props.href ?? "-")

  return (
    <Link
      href={props.href ?? param}
      className="flex gap-2 items-center p-3 py-2
      text-sm box-content font-normal text-white/80

      hover:bg-blue-100/10
      data-[selected=true]:bg-blue-500
      data-[selected=true]:text-white
      data-[selected=true]:border-l-blue-200
      data-[selected=true]:border-l-4
      data-[selected=true]:font-medium
      "
      data-selected={selected}
    >
      <div className="rounded-full w-5 h-5 flex items-center justify-center">
        {props.icon}
      </div>
      <div>
        {props.label}
      </div>
    </Link>
  )
}

export function SidebarGroup(
  props: {
    label: string,
    icon?: ReactNode,
    children?: ReactNode
  }
) {
  const [collapsed, setCollapsed] = useState(true)
  const collapse = () => setCollapsed(true)
  const expand = () => setCollapsed(false)
  const toggle = () => setCollapsed(prev => !prev)

  return (
    <div className="">
      <div onClick={toggle} className="flex gap-2 items-center p-3 py-2
      text-sm box-content font-normal text-white/80

      cursor-pointer select-none
      hover:bg-blue-100/10

      ">
        <div className={cn(
          "rounded-full w-5 h-5 flex items-center justify-center transition-all font-extrabold",
          collapsed ? "" : "rotate-90"
        )}>
          {props.icon} {'>'}
        </div>
        <div>
          {props.label}
        </div>
      </div>
      {
        collapsed
          ? <></>
          : <div className="bg-black/10 py-2">
            {props.children}
          </div>
      }
    </div>
  )

}