"use client"

import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { createVehicleBodyTypeConfiguration } from "./action"

export function AddVehicleBodyTypeConfigurationForm() {
  const router = useRouter()

  return (
    <form className="card p-6" action={async (formData) => {
      try {
        toast(await createVehicleBodyTypeConfiguration({
          name: formData.get('name') as string,
          isActive: formData.get('status') === "active"
        }))
        router.push('/configure-assets/vehicle-body-type')

      } catch (error: any) {
        toast.error(`Error: ${ error.message }`)
      }
    }}>
      <h2 className="text-2xl">Vehicle Body Type Information</h2>
      <hr />
      <div className="grid grid-cols-3 gap-4 mt-4">
        <fieldset>
          <label>Vehicle Type</label>
          <input required name="name" className="p-1.5 px-3" placeholder="e.g. Truck" />
        </fieldset>
        <fieldset className="items-start">
          <label>Status</label>
          <div className="flex items-center gap-2 my-1">
            <input name="status" type="checkbox" value="active" className="w-6 h-6 overflow-hidden" />
            <label>Active</label>
          </div>
        </fieldset>
      </div>
      <button className="primary mt-8">
        Save Configuration
      </button>
    </form>
  )
}