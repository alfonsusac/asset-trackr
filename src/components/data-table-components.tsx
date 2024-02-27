import { ComponentPropsWithoutRef, ForwardedRef, ReactNode, forwardRef } from "react"
import { DeleteAlert } from "./alert"
import { Input } from "./input"
import { ColumnDef } from "@tanstack/react-table"

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

export function TableActionDeleteButton(
  props: { onContinue: () => Promise<void> }
) {
  return (
    <DeleteAlert
      onContinue={props.onContinue}
    >
      <button className="p-1 outline-red-300 border-none">🗑️</button>
    </DeleteAlert>
  )

}

export function TableHeader(
  props: {
    children?: ReactNode
  }
) {
  return (
    <div className="flex justify-between mt-4 pt-2 mb-4">
      <Input className="max-w-56" placeholder="Search" />
      <div>
        {props.children}
      </div>
    </div>
  )
}

export function generateActionColumn<T>(render: (data: T) => ReactNode) {

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
