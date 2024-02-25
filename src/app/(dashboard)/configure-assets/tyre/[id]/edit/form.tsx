"use client"

import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { TyreConfiguration } from "@prisma/client"
import { editTyreConfiguration } from "./action"
import { toInt } from "@/lib/validation"
import tyreImg from "../../create/tyre.jpeg"
import sizeImg from "../../create/size.png"
import Image from "next/image"

export function EditTyreConfigurationForm(
  props: {
    data: TyreConfiguration
  }
) {
  const router = useRouter()

  return (
    <form className="card p-6" action={async (formData) => {
      try {
        toast(await editTyreConfiguration(props.data.id, {
          brand: formData.get('brand') as string,
          pattern: formData.get('pattern') as string,

          sectionWidth: toInt(formData.get('sectionWidth') as string),
          tubeType: formData.get('tubeType') as string,
          speedSymbol: formData.get('speedSymbol') as string,

          construction: formData.get('construction') as string,
          plyRating: toInt(formData.get('plyRating') as string),
          traCode: formData.get('traCode') as string,

          rimDiameter: toInt(formData.get('rimDiameter') as string),
          loadIndex: formData.get('loadIndex') as string,
          starRating: toInt(formData.get('starRating') as string),

          originalThreadDepth: toInt(formData.get('originalThreadDepth') as string),
        }))
        router.push('/configure-assets/tyre')

      } catch (error: any) {
        toast.error(`Error: ${ error.message }`)
      }
    }}>
      <h2 className="text-2xl">Tyre Information</h2>
      <hr />
      <div className="grid grid-cols-3 gap-4 mt-4">

        <fieldset>
          <label>Brand Name</label>
          <input required name="brand" defaultValue={props.data.brand} className="p-1.5 px-3" placeholder="e.g. Bridgestrone" />
        </fieldset>
        <fieldset>
          <label>Pattern/Type</label>
          <input required name="pattern" defaultValue={props.data.pattern} className="p-1.5 px-3" placeholder="e.g. MRN" />
        </fieldset>

      </div>

      <h2 className="text-2xl pt-8">Tyre Specification</h2>
      <hr />

      <div className="flex *:flex-initial *:object-contain">
        <Image src={tyreImg} alt="" />
        <Image src={sizeImg} alt="" />
      </div>


      <div className="grid grid-cols-3 gap-4 mt-4">
        <fieldset>
          <label>Section Width / Aspect Ratio</label>
          <input required name="sectionWidth" defaultValue={props.data.sectionWidth} type="number" className="p-1.5 px-3" placeholder="e.g. 7.50" />
        </fieldset>
        <fieldset>
          <label>Tube Type / Tubeless</label>
          <input required name="tubeType" defaultValue={props.data.tubeType} className="p-1.5 px-3" placeholder="e.g. Tube Type" />
        </fieldset>
        <fieldset>
          <label>Speed Symbol</label>
          <input required name="speedSymbol" defaultValue={props.data.speedSymbol} className="p-1.5 px-3" placeholder="e.g. L" />
        </fieldset>

        <fieldset>
          <label>Construction</label>
          <input required name="construction" defaultValue={props.data.construction} className="p-1.5 px-3" placeholder="e.g. R" />
        </fieldset>
        <fieldset>
          <label>Ply Rating (PR)</label>
          <input required name="plyRating" type="number" defaultValue={props.data.plyRating} className="p-1.5 px-3"
            placeholder="e.g. 14" />
        </fieldset>
        <fieldset>
          <label>TRA Code (OTR)</label>
          <input required name="traCode" defaultValue={props.data.traCode} className="p-1.5 px-3"
            placeholder="e.g. E3, L3" />
        </fieldset>

        <fieldset>
          <label>Rim Diameter</label>
          <input required name="rimDiameter" type="number" defaultValue={props.data.rimDiameter} className="p-1.5 px-3"
            placeholder="e.g. 16" />
        </fieldset>
        <fieldset>
          <label>Load Index</label>
          <input required name="loadIndex" defaultValue={props.data.loadIndex} className="p-1.5 px-3" placeholder="e.g. 121/120" />
        </fieldset>
        <fieldset>
          <label>Star Rating (OTR)</label>
          <input required name="starRating" type="number" defaultValue={props.data.starRating} className="p-1.5 px-3" placeholder="e.g. 2" />
        </fieldset>

        <fieldset>
          <label>Original Thread Depth</label>
          <input required name="originalThreadDepth" type="number" defaultValue={props.data.originalThreadDepth} className="p-1.5 px-3" placeholder="e.g. 12" />
        </fieldset>
      </div>

      <button className="primary mt-8">
        Save Configuration
      </button>
    </form>
  )
}