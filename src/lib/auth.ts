import { AuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "./util"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env('GOOGLE_ID'),
      clientSecret: env('GOOGLE_SECRET')
    })
  ]
}


export async function auth() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return undefined
    }
    if (!session.user) {
      throw new Error("User object not found")
    }
    if (!session.user.email) {
      throw new Error("User email not found")
    }
    if (!session.user.name) {
      throw new Error("User name not found")
    }

    return {
      expiry: session.expires,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image
    }

  } catch (error: any) {
    console.log(error.message)
    return undefined
  }
}