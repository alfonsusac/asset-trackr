import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import WorkOrderListTable from "./client"
import { MainSection } from "../../components"

export default function WorkOrderListPage() {

  return (
    <MainSection>

      <div className="flex justify-between items-end">
        <h1>Work Order List</h1>

        <div className="card p-1 fcenter rounded-xl">
          <button className="border-none outline-transparent bg-blue-500 text-white">📃 List View</button>
          <button className="border-none outline-transparent hover:bg-neutral-500/10">📅 Calendar Schedule</button>
        </div>
      </div>

      <WorkOrderListTable />

    </MainSection>
  )
}