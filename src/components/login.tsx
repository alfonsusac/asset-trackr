"use client"

import { signIn } from "next-auth/react"

export default function GoogleLoginButton() {
  return (
    <button
      className="p-2 px-8 rounded-md mt-12"
      onClick={() => signIn('google')}>
      Login via Google
    </button>
  )
}