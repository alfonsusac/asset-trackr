import Link from "next/link"
import { usePathname } from "next/navigation"

export function HorizontalTabAsLink(
  props: {
    href: string,
    label: string
  }
) {

  const path = usePathname()

  // if (path ===)

  return (
    <Link href={props.href}>
      {props.label}
    </Link>
  )

}

