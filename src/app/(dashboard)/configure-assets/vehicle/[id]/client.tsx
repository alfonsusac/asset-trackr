"use client"

import { DeleteAlert } from "@/components/alert"
import deleteVehicleConfiguration from "../action"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export function DeleteVehicleConfigurationButton(props: { id: string }) {

  const router = useRouter()

  return (
    <DeleteAlert
      onContinue={
        async () => {
          toast(await deleteVehicleConfiguration(props.id))
          router.replace('/configure-assets/vehicle')
        }
      }
    >
      <button className="destroy">🗑️ Delete</button>
    </DeleteAlert>
  )

}