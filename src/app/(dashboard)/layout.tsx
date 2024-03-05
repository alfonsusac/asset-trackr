import GoogleLoginButton from "@/components/login"
import { SidebarGroup, SidebarItem } from "@/components/sidebarItem"
import { auth } from "@/lib/auth"
import Image from "next/image"
import { ReactNode } from "react"

export default async function DashboardLayout(
  props: {
    children: ReactNode
  }
) {
  const session = await auth()

  if (!session) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl">
          Login to continue
        </h1>
        <GoogleLoginButton />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen max-h-screen">

      <div className="w-52 pb-8 bg-blue-600 flex-none text-white fcol max-h-screen overflow-auto">
        {/* Sidebar */}
        <div className="p-4 font-semibold text-xl flex-none">
          AssetTrackr
        </div>

        <nav className="flex flex-col mt-4 flex-none">
          <SidebarItem label="Dashboard" href="/" />
          <SidebarGroup label="Work Order">
            <SidebarItem label="Work Order List" href="/work-order" />
            <SidebarItem label="Checklist" href="/work-order-checklist" />
            <SidebarItem label="Work Order Category" href="/work-order-category" />
          </SidebarGroup>
          <SidebarItem label="Reports" href="/reports" />
          <SidebarItem label="Approval" href="/approval" />
          <SidebarGroup label="Asset Management">
            <SidebarItem label="Vehicle" href="/vehicle" />
          </SidebarGroup>
          <hr className="mx-4 my-4 border-white/40" />
          <SidebarItem label="Inventory" href="/inventory" />
          <SidebarItem label="Locations" href="/locations" />
          <SidebarItem label="User Management" href="/user-management" />
          <SidebarItem label="Asset Configuration" href="/configure-assets" />
          <SidebarItem label="Vendors" href="/vendors" />
          <SidebarGroup label="Settings">
            <SidebarItem label="Company" href="/settings-company" />
            <SidebarItem label="Department" href="/settings-department" />
          </SidebarGroup>
        </nav>
      </div>

      <div className="w-full flex flex-col">
        <header className="flex flex-none items-center justify-end h-14 px-4 border-b">
          {/* Header */}
          <div className=" h-8 aspect-square border flex items-center justify-center rounded-full mx-4">
            N
          </div>

          <div className="border-l border-l-neutral-500/30 px-4 flex gap-2 items-center ">
            {/* User Info */}
            <div className="text-end">
              <div className="text-sm font-medium leading-tight">{session.name}</div>
              <div className="text-sm opacity-40 leading-tight">Admin</div>
            </div>
            <div>
              <Image className="bg-blue-700 rounded-full" unoptimized width={36} height={36} src={session.image ?? ""} alt="" />
            </div>
          </div>
        </header>


        {props.children}

      </div>
    </main>
  )

}