import Link from "next/link"
import { SVGProps } from "react"
import { PhCaretRightFill } from "./icons"

export function Breadcrumb(
  props: {
    links: { href?: string, label: string }[],
  }
) {
  const [first, ...rest] = props.links

  let el = []

  el.push(
    first && first.href
      ? <Link key={el.length} href={first.href} className="button ghost lineunder !text-blue-600 !py-0">{first.label}</Link>
      : <span key={el.length}>{first.label}</span>
  )

  for (const l of rest) {
    el.push(
      <span key={el.length} className=""> <PhCaretRightFill className="text-neutral-600" /> </span>
    )
    el.push(
      l && l.href
        ? <Link key={el.length} href={l.href} className="">{l.label}</Link>
        : <span key={el.length} className="">{l.label}</span>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      {el}
    </div>
  )
}

