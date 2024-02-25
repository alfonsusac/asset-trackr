import Link from "next/link"
import { ReactNode } from "react"

export default function ConfigureAssetLayout(
  props: {
    children: ReactNode
  }
) {

  return (
    <>
      {props.children}
    </>
  )
}