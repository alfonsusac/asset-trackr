"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table"
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"

export function DataTable<TData, TValue>(
  props: {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }
) {
  const { data, columns } = props
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="my-2">

      <div className="rounded-sm overflow-hidden border-b">
        <Table className="">
          <TableHeader>
            {
              table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {
                    headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {
                          header.isPlaceholder ? null : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        }
                      </TableHead>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableHeader>
          <TableBody>
            {
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {
                      row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          }
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <button
          className="border-none text-xs outline-none hover:text-black"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <div className="px-2">
          {table.getPageCount()}
        </div>
        <button
          className="border-none text-xs outline-none hover:text-black"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>

  )

}