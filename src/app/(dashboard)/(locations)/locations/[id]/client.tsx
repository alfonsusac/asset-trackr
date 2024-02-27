"use client"

import { Input } from "@/components/input"
import { toastAction } from "@/lib/action-toast"
import { ReactNode, useState } from "react"
import { createSubLocation, deleteSubLocation, editSubLocation } from "./action"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog"
import { SubLocations } from "@prisma/client"
import { DeleteAlert } from "@/components/alert"
import { useRouter } from "next/navigation"
import { deleteLocation } from "../action"

export function AddOrEditSubLocationDialog(props: {
  locationID: string
  children: ReactNode
  data?: SubLocations
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {
              props.data
                ? "Edit Sub Location"
                : "Add Sub Location"
            }
          </DialogTitle>
        </DialogHeader>
        <div>
          <form className="flex flex-col gap-2 mt-4" action={
            async (form) => {
              if (props.data) {
                toastAction(editSubLocation(props.data.id, {
                  name: form.get('name') as string,
                  description: form.get('description') as string,
                }), {
                  onSuccess: () => setOpen(false)
                })
              } else {
                toastAction(createSubLocation(props.locationID, {
                  name: form.get('name') as string,
                  description: form.get('description') as string,
                }), {
                  onSuccess: () => setOpen(false)
                })
              }
            }
          }>
            <fieldset>
              <label className="label-required">Location Name</label>
              <Input
                required
                name="name"
                placeholder="Enter location name"
                defaultValue={props.data?.name}
              />
            </fieldset>
            <fieldset>
              <label>Description</label>
              <Input
                name="description"
                placeholder="Enter Description"
                defaultValue={props.data?.description ?? undefined}
              />
            </fieldset>
            <button className="self-end primary mt-4 px-8">
              Save
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )

}


export function DeleteSubLocationDialog(
  props: {
    id: string
    children: ReactNode
  }
) {
  return (
    <DeleteAlert
      onContinue={async () => { toastAction(deleteSubLocation(props.id)) }}
    >
      {props.children}
    </DeleteAlert>
  )
}

export function DeleteLocationDialog(
  props: {
    id: string
    children: ReactNode
  }
) {
  const router = useRouter()

  return (
    <DeleteAlert
      onContinue={async () => {
        toastAction(deleteLocation(props.id), {
          onSuccess: () => router.replace('/locations')
        })
      }}
      description={<>
        <div>
        This action cannot be undone. This will permanently delete the item and remove the data from our servers.
        </div>
        <div className="font-semibold my-2">
          ⚠️ This will also delete all the sub locations assigned to this location
        </div>
      </>
      }
    >
      {props.children}
    </DeleteAlert>
  )
}



