import { cn } from "@/lib/cn"
import { ReactNode } from "react"

export function MainSection(
  props: {
    subpage?: boolean
    children?: ReactNode
    className?: string
  }
) {

  if (props.subpage) {
    return (
      <main className={cn("grow overflow-auto space-y-4 p-8 bg-blue-700/5", props.className)}>
         {props.children}
      </main>
    )
  }

  return (
    <main className={cn("grow overflow-auto space-y-4 bg-white p-8", props.className)}>
      {props.children}
    </main>
  )
}