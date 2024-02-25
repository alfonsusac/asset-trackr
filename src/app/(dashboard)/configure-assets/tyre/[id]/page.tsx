import { PageProps } from "@/lib/next"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { DeleteTyreConfigurationButton } from "./client"
import { MainSection } from "@/app/(dashboard)/components"

export default async function ConfigureAssetPage(page: PageProps<['id']>) {

  const { id } = page.params

  const data = await prisma.tyreConfiguration.findUnique({ where: { id } })

  const header = <div className="flex items-center gap-2 text-sm text-neutral-400">
    <Link href="/configure-assets/tyre" className="text-blue-500">
      Asset Configuration
    </Link>
    <span>{'>'}</span>
    <span>View Tyre Configuration</span>
    <span>{'>'}</span>
    <span>{id}</span>
  </div>

  if (!data) return (
    <MainSection subpage>
      {header}

      <h1>View Tyre Configuration</h1>
      <div className="card min-h-40 fcenter">
        Tyre Configuration Not Found
      </div>
    </MainSection>
  )


  return (
    <MainSection subpage>
      {header}

      <h1>View Tyre Configuration</h1>

      <div className="flex gap-2 text-sm">
        <Link href={`${ id }/edit`} className="button">✏️ Edit</Link>
        <DeleteTyreConfigurationButton id={id} />
      </div>

      <div className="card card-big">
        <header>Tyre Information</header>
        <hr />
        <table className="fields">
          <tbody>
            <tr>
              <th>Brand Name Type</th>
              <td>{data.brand}</td>
            </tr>
            <tr>
              <th>Model</th>
              <td>{data.pattern}</td>
            </tr>

          </tbody>
        </table>

        <br />
        <header>Tyre Information</header>
        <hr />
        <table className="fields">
          <tbody>
            <tr>
              <th>Section Width / Aspect Ration</th>
              <td>{data.sectionWidth}</td>
            </tr>
            <tr>
              <th>Construction</th>
              <td>{data.construction}</td>
            </tr>
            <tr>
              <th>Original Thread Depth</th>
              <td>{data.originalThreadDepth}</td>
            </tr>
            <tr>
              <th>Tube Type / Tubeless</th>
              <td>{data.tubeType}</td>
            </tr>
            <tr>
              <th>Ply Rating</th>
              <td>{data.plyRating}</td>
            </tr>
            <tr>
              <th>Load Index</th>
              <td>{data.loadIndex}</td>
            </tr>
            <tr>
              <th>Speed Symbol</th>
              <td>{data.speedSymbol}</td>
            </tr>
            <tr>
              <th>TRA Code (OTR)</th>
              <td>{data.traCode}</td>
            </tr>
            <tr>
              <th>Star Rating (OTR)</th>
              <td>{data.starRating}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainSection>
  )
}

