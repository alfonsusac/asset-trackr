"use client"

import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { VehicleAssetConfiguration } from "@prisma/client"
import { editVehicleConfiguration } from "./action"

export function EditVehicleConfigurationForm(
  props: {
    data: VehicleAssetConfiguration
  }
) {
  const router = useRouter()

  return (
    <form className="card p-6" action={async (formData) => {
      try {
        toast(await editVehicleConfiguration(props.data.id, {
          type: formData.get('type') as string,
          brand: formData.get('brand') as string,
          model: formData.get('model') as string,
          engineModel: formData.get('engine') as string,
          transmissionModel: formData.get('transmission') as string,
          isActive: formData.get('status') === "active"
        }))
        router.push('/configure-assets/vehicle')

      } catch (error: any) {
        toast.error(`Error: ${ error.message }`)
      }
    }}>
      <header className="text-xl">Vehicle Information</header>
      <hr />
      <div className="grid grid-cols-3 gap-4 mt-4">
        <fieldset>
          <label>Vehicle Type</label>
          <input required defaultValue={props.data.type} name="type" className="p-1.5 px-3" placeholder="e.g. Truck" />
        </fieldset>
        <fieldset>
          <label>Brand Name Type</label>
          <input required defaultValue={props.data.brand} name="brand" className="p-1.5 px-3" placeholder="e.g. Hino" />
        </fieldset>
        <fieldset>
          <label>Model</label>
          <input required defaultValue={props.data.model} name="model" className="p-1.5 px-3" placeholder="e.g. 500 series FG 260 JK. ABS - Euro4" />
        </fieldset>
        <fieldset>
          <label>Engine Model</label>
          <input required defaultValue={props.data.engineModel} name="engine" className="p-1.5 px-3" placeholder="e.g. 500 series FG 260 JK. ABS - Euro4" />
        </fieldset>
        <fieldset>
          <label>Transmission Model</label>
          <input required defaultValue={props.data.transmissionModel} name="transmission" className="p-1.5 px-3" placeholder="e.g. 500 series FG 260 JK. ABS - Euro4" />
        </fieldset>
        <fieldset className="items-start">
          <label>Status</label>
          <div className="flex items-center gap-2 my-1">
            <input defaultChecked={props.data.isActive} name="status" type="checkbox" value="active" className="w-6 h-6 overflow-hidden" />
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