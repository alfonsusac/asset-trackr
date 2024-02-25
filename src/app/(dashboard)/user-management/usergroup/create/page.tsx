import { MainSection } from "@/app/(dashboard)/components"
import Link from "next/link"

export default function CreateUserGroupPage() {

  return (
    <MainSection subpage>
      <div className="bg-white -mx-8 -mt-8 p-4 flex items-center justify-between">
        <Link href="/user-management">Back</Link>
        <button>Save</button>
      </div>
      <h1>Add New Group User</h1>
    </MainSection>
  )
}