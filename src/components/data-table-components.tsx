import { ComponentPropsWithoutRef, ForwardedRef, ReactNode, forwardRef } from "react"
import { DeleteAlert } from "./alert"
import { Input } from "./input"
import { ColumnDef } from "@tanstack/react-table"
import { useQueryState } from "nuqs"
import Link from "next/link"
import { toastAction } from "@/lib/action-toast"
import { ServerActionResponse } from "@/lib/action"

export const TableActionEditDialogButton = forwardRef(
  function TableActionEditDialogButton(
    props: ComponentPropsWithoutRef<"button">,
    ref: ForwardedRef<HTMLButtonElement>
  ) {
    return (
      <button {...props} ref={ref} className="p-1 border-none">
        ✏️
      </button>
    )
  }
)




export function generateActionColumn<T>(render: (data: T) => ReactNode): ColumnDef<T> {
  const column: ColumnDef<T> = {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="min-w-16 flex gap-2">
          {render(row.original)}
        </div>
      )
    }
  }
  return column
}


export function DataTableHeader(
  props: { children: ReactNode }
) {
  const [search, setSearch] = useQueryState('search', {
    throttleMs: 500
  })
  return (
    <div className="flex justify-between mt-4 mb-4">
      <Input className="max-w-56" placeholder="Search" value={search ?? undefined} onChange={(e) => {
        e.preventDefault()
        setSearch(e.target.value)
      }} />
      {props.children}
    </div>
  )
}





// -- new ver

export const DataTableSeeDetailLink = forwardRef(
  function DataTableSeeDetailLink(
    props: ComponentPropsWithoutRef<typeof Link>,
    ref: ForwardedRef<HTMLAnchorElement>
  ) {
    return (
      <Link {...props} ref={ref} className="button button-icon border-none">
        ✏️
      </Link>
    )
  }
)

export function DataTableDeleteButton<T>(
  props: { onContinue: Promise<ServerActionResponse<T>> }
) {
  return (
    <DeleteAlert
      onContinue={
        async () => {
          toastAction(props.onContinue)
        }
      }
      // onContinue={props.onContinue ?? (async () => { })}
    >
      <button className="p-1 outline-red-300 border-none">🗑️</button>
    </DeleteAlert>
  )

}