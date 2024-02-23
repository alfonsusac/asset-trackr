import GoogleLoginButton from "@/components/login"
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
    <main className="flex min-h-screen ">

      <div className="w-52 bg-blue-600 flex-none text-white">
        {/* Sidebar */}
        <div className="p-3 font-semibold">
          AssetTrackr
        </div>
      </div>

      <article className="w-full">
        <header className="flex items-center justify-end h-16 px-4 border-b">

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
      </article>
    </main>
  )

}