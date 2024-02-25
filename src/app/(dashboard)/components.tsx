import { ReactNode } from "react"

export function MainSection(
  props: {
    subpage?: boolean
    children?: ReactNode
  }
) {

  if (props.subpage) {
    return (
      <main className="grow overflow-auto space-y-4 p-8 bg-blue-700/5">
         {props.children}
      </main>
    )
  }

  return (
    <main className="grow overflow-auto space-y-4 bg-white p-8">
      {props.children}
    </main>
  )
}