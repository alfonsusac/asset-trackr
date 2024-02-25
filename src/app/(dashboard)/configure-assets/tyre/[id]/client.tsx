"use client"

import { DeleteAlert } from "@/components/alert"
import deleteTyreConfiguration from "../action"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export function DeleteTyreConfigurationButton(props: { id: string }) {

  const router = useRouter()

  return (
    <DeleteAlert
      onContinue={
        async () => {
          toast(await deleteTyreConfiguration(props.id))
          router.replace('/configure-assets/tyre')
        }
      }
    >
      <button className="destroy">🗑️ Delete</button>
    </DeleteAlert>
  )

}