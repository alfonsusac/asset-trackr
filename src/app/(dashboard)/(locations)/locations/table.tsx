'use client'

import { DataTable } from "@/components/data-table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog"
import { Input } from "@/components/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/select"
import { toastAction } from "@/lib/action-toast"
import { Location, LocationStatus } from "@prisma/client"
import { SelectValue } from "@radix-ui/react-select"
import { ReactNode, SVGProps, useState } from "react"
import { createLocation, deleteLocation, editLocation } from "./action"
import { TableActionDeleteButton, TableActionEditDialogButton, TableHeader, generateActionColumn } from "@/components/data-table-components"
import { getLocaleDate } from "@/lib/date"
import toast from "react-hot-toast"
import Link from "next/link"

export default function LocationTable(
  props: {
    locations: Location[]
  }
) {
  const [openCreateModal, setOpenCreateModal] = useState(false)

  return (
    <>
      <TableHeader>
        <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
          <DialogTrigger asChild>
            <button className="primary">
              + Add Location
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Location</DialogTitle>
            </DialogHeader>
            <div>
              <form className="flex flex-col gap-2 mt-4" action={
                async (form) => {
                  toastAction(createLocation({
                    name: form.get('name') as string,
                    status: form.get('status') as any,
                    address: form.get('address') as string,
                    description: form.get('description') as string,
                  }), {
                    onSuccess() {
                      setOpenCreateModal(false)
                    },
                  })
                }
              }>
                <fieldset>
                  <label>Location Name</label>
                  <Input required name="name" placeholder="Enter location name" />
                </fieldset>
                <fieldset>
                  <label>Location Status*</label>
                  <Select name="status" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        Object.entries(LocationStatus).map(s => (
                          <SelectItem key={s[1]} value={s[1]}>{s[1]}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </fieldset>
                <fieldset>
                  <label>Address</label>
                  <Input name="address" placeholder="Enter address" />
                </fieldset>
                <fieldset>
                  <label>Description</label>
                  <Input name="description" placeholder="Enter Description" />
                </fieldset>
                <button className="self-end primary mt-4 px-8">
                  Create
                </button>
              </form>
            </div>
          </DialogContent>
        </Dialog>


      </TableHeader>
      <DataTable
        data={props.locations}
        columns={[
          { accessorKey: "name", header: "Location Name" },
          { accessorKey: "address", header: "Address" },
          { accessorKey: "description", header: "Description" },
          {
            accessorKey: "status", header: "Status",
            cell: (props) => {
              const { status } = props.row.original
              if (status === "Available") {
                return (<div className="badge">Available</div>)
              }
              if (status === "Closed") {
                return (<div className="badge saturate-0">Closed</div>)
              }
            }
          },
          {
            accessorFn: (e) => getLocaleDate(e.created_at),
            header: "Created Date"
          },
          generateActionColumn<Location>((data) =>
            <>
              {/* <EditLocationModal data={data}>
                <TableActionEditDialogButton />
              </EditLocationModal> */}
              <Link href={`/locations/${data.id}`}>
                <TableActionEditDialogButton />
              </Link>
              <TableActionDeleteButton
                onContinue={
                  async () => {
                    toastAction(deleteLocation(data.id))
                  }
                }
              />
            </>
          )
        ]}
        // rowHref={(row) => `/loactions/${row.id}`}
      />
      {/* <TableFooter
        count={props.locations.length}
      /> */}
    </>
  )
}

function EditLocationModal(
  props: { children: ReactNode, data: Location }
) {
  const [open, setOpen] = useState(false)
  const { name, address, description, status, id } = props.data

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
        </DialogHeader>
        <div>
          <form className="flex flex-col gap-2 mt-4" action={
            async (form) => {
              toastAction(editLocation(id, {
                name: form.get('name') as string,
                status: form.get('status') as any,
                address: form.get('address') as string,
                description: form.get('description') as string,
              }), {
                onSuccess() {
                  setOpen(false)
                },
              })
            }
          }>
            <fieldset>
              <label>Location Name</label>
              <Input
                name="name"
                placeholder="Enter location name"
                defaultValue={name}
              />
            </fieldset>
            <fieldset>
              <label>Location Status*</label>
              <Select name="status" defaultValue={status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {
                    Object.entries(LocationStatus).map(s => (
                      <SelectItem key={s[1]} value={s[1]}>{s[1]}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </fieldset>
            <fieldset>
              <label>Address</label>
              <Input name="address" placeholder="Enter address" defaultValue={address ?? undefined} />
            </fieldset>
            <fieldset>
              <label>Description</label>
              <Input name="description" placeholder="Enter Description" defaultValue={description ?? undefined} />
            </fieldset>
            <button className="self-end primary mt-4 px-8">
              Create
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}


// function TableFooter(
//   props: {
//     count: number,
//   }
// ) {
//   const [show, setShow] = useQueryState('show')
//   const [page, setPage] = useQueryState('page')

//   return (
//     <div className="px-2 my-2 flex justify-between text-sm">
//       <div className="flex gap-4 text-neutral-400">
//         <div>{props.count} reults</div>
//         <div className="w-0.5 h-full bg-neutral-200/50" />
//         <div>Show</div>
//       </div>
//       <div className="flex items-center gap-4 text-neutral-500">
//         <button className="h-8 w-8 p-0 border-transparent">
//           <PhCaretLeftBold />
//         </button>
//         <div className="text-black">Page 1 of {props.count / 10 + 1}</div>
//         <button className="h-8 w-8 p-0 border-transparent">
//           <PhCaretRight />
//         </button>
//       </div>
//     </div>
//   )
// }



