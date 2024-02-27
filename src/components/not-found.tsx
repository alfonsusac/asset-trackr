import { MainSection } from "@/app/(dashboard)/components"
import Link from "next/link"

export function ResourceNotFound(props: {
  text: string,
  backHref: string,
}) {
  return (
    <MainSection subpage>
      <div className="h-full fcenter fcol gap-4">
        <header className="fcenter fcol gap-1">
          <h1 className="text-base font-semibold text-neutral-400">Page Not Found</h1>
          <h1 className="text-3xl">{props.text}</h1>
          <div className="text-neutral-600">The resource you are looking for could not be found.</div>
        </header>
        <Link href={props.backHref} className="mt-4 button">Go Back</Link>
      </div>
    </MainSection>
  )
}
