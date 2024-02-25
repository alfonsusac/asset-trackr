"use client"

import { DeleteAlert } from "@/components/alert"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import deleteVehicleBodyTypeConfiguration from "../action"

export function DeleteVehicleBodyTypeConfigurationButton(props: { id: string }) {

  const router = useRouter()

  return (
    <DeleteAlert
      onContinue={
        async () => {
          toast(await deleteVehicleBodyTypeConfiguration(props.id))
          router.replace('/configure-assets/vehicle-body-type')
        }
      }
    >
      <button className="destroy">🗑️ Delete</button>
    </DeleteAlert>
  )
}