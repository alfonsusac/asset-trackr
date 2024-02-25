import GoogleLoginButton from "@/components/login"
import { auth } from "@/lib/auth"
import { cn } from "@/lib/cn"
import { ReactNode } from "react"

export default async function Home() {

  const session = await auth()

  if (!session) {
    return (
      <main className="grow flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl">
          Login to continue
        </h1>
        <GoogleLoginButton />
      </main>
    )
  }

  return (
    <>

      <header className="frow items-end justify-between">

        <div className="fcol gap-2">
          <h1>Dashboard</h1>
          <div className="opacity-80">Hi {session.name}, welcome to Asset Trackr!</div>
        </div>

        <div className="frow items-center gap-4">
          <div className="text-sm fcenter gap-2">
            Data Period:
            <select className="card">
              <option>Test</option>
            </select>
          </div>
          <div>
            <input type="date" defaultValue="now" className="rounded-md card py-0.5 px-2" />
          </div>
        </div>

      </header>

      {/* First Row */}
      <div className="flex gap-4 flex-wrap pt-4">
        <DashboardCard>
          <CardHeader>
            <div>No. of Vehicle</div>
          </CardHeader>
          <div className="text-xl font-semibold">
            617
          </div>
        </DashboardCard>
        <DashboardCard>
          <CardHeader>
            <div>No. of Tyre</div>
          </CardHeader>
          <div className="text-xl font-semibold">
            2352
          </div>
        </DashboardCard>
        <DashboardCard>
          <CardHeader>
            <div>New Stock</div>
          </CardHeader>
          <div className="text-xl font-semibold">
            172
          </div>
        </DashboardCard>
        <DashboardCard>
          <CardHeader>
            <div>Active Tyre</div>
          </CardHeader>
          <div className="text-xl font-semibold">
            2152
          </div>
        </DashboardCard>
        <DashboardCard>
          <CardHeader>
            <div>Inactive Tyre</div>
          </CardHeader>
          <div className="text-xl font-semibold">
            200
          </div>
        </DashboardCard>
      </div>

      {/* Second Row */}
      <div className="flex gap-4 flex-wrap">
        <DashboardCard className="space-y-4">
          <CardHeader className="fcenter justify-between">
            <div>
              <div>
                Total Tyre Statistic
              </div>
              <div className="fcenter gap-4 text-sm mt-1 text-neutral-600 font-normal">
                <div className="fcenter gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  Active
                </div>
                <div className="fcenter gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full" />

                  Inactive
                </div>
                <div className="fcenter gap-2">
                  <div className="w-3 h-3 bg-blue-200 rounded-full" />

                  Scrap
                </div>
              </div>
            </div>
            <div className="space-x-2 text-sm mx-2 font-normal">
              <select className="p-1">
                <option>Status</option>
              </select>
              <select className="p-1">
                <option>Brand</option>
              </select>
            </div>
          </CardHeader>
          <div className="h-56">

          </div>
        </DashboardCard>
        <DashboardCard className="max-w-md w-full flex-none">
          <CardHeader>
            <div>Activity Reminder</div>
          </CardHeader>
          <div className="">

          </div>
        </DashboardCard>
      </div>

      {/* Third Row */}
      <div className="flex gap-4 flex-wrap">
        <DashboardCard className="space-y-4">
          <CardHeader className="fcenter justify-between">
            <div>
              <div>
                Scrap Tyres
              </div>
            </div>
          </CardHeader>
          <div className="h-56">

          </div>
        </DashboardCard>
        <DashboardCard className="max-w-md w-full flex-none">
          <CardHeader className="fcenter justify-between">
            <div>
              <div>
                Inspection Activity
              </div>
              <div className="fcenter gap-4 text-sm mt-1 text-neutral-600 font-normal">
                <div className="fcenter gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  Total Inspection
                </div>
                <div className="fcenter gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full" />
                  Completed Inspections
                </div>
              </div>
            </div>
          </CardHeader>
          <div className="">

          </div>
        </DashboardCard>
      </div>

      {/* Fourth Row */}
      <div className="flex gap-4 flex-wrap">
        <DashboardCard className="space-y-4">
          <CardHeader>
            Inactive Tyres
          </CardHeader>
          <div className="h-56">

          </div>
        </DashboardCard>
        <DashboardCard className="">
          <CardHeader>
            Tyre Brand Compositions Activity
          </CardHeader>
          <div className="">

          </div>
        </DashboardCard>
      </div>

      {/* Fifth Row */}
      <div className="flex gap-4 flex-wrap">
        <DashboardCard className="space-y-4">
          <CardHeader>
            <div>
              Average CPK
            </div>
            <div className="badge">
              By Brand
            </div>
          </CardHeader>
          <div className="h-56">

          </div>
        </DashboardCard>
        <DashboardCard className="">
          <CardHeader>
            <div>
              Average CPK
            </div>
            <div className="badge">
              By Retread
            </div>
          </CardHeader>
          <div className="">

          </div>
        </DashboardCard>
        <DashboardCard className="">
          <CardHeader>
            <div>
              Avg. Projected Life
            </div>
            <div className="text-blue-600 text-sm mx-3 font-normal">
              {'See All >'}
            </div>
          </CardHeader>
          <div className="">

          </div>
        </DashboardCard>
      </div>
    </>
  )

}


function DashboardCard(
  props: {
    title?: string,
    icon?: ReactNode,
    children?: ReactNode,
    className?: string,
  }
) {
  return (
    <div className={cn("card p-4 grow flex-1 space-y-1", props.className)}>
      {props.children}
    </div>
  )
}

function CardHeader(
  props: {
    children?: ReactNode
    className?: string,
  }
) {
  return (
    <header className={cn("text-neutral-800 font-medium fcenter justify-between", props.className)}>
      {props.children}
    </header>
  )

}