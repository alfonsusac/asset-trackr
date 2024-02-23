import GoogleLoginButton from "@/components/login"
import { auth } from "@/lib/auth"

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
    <main className="flex min-h-screen ">
      Hello World
    </main>
  )

}
