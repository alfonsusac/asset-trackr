import { MainSection } from "../../components"
import { ManageVehicleTable } from "./client"

export default async function VehicleMasterlistPage() {

  return (
    <MainSection>
      <header>
        <h1>Vehicle Masterlist</h1>
        <div className="opacity-60">Hi -user-, welcome to Asset Trackr!</div>
      </header>
      
      <div>
      <ManageVehicleTable data={{}} /> 
      </div>
    </MainSection>
  )
}