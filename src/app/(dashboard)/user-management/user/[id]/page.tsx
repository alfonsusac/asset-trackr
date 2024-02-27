import { MainSection } from "@/app/(dashboard)/components"
import { Breadcrumb } from "@/components/breadcrumbs"
import { ResourceNotFound } from "@/components/not-found"
import { PageProps } from "@/lib/next"
import { prisma } from "@/lib/prisma"
import Image from "next/image"
import { ResetPasswordDialogButton } from "./dialogs"

export default async function UserDetailPage(props: PageProps<['id']>) {

  const id = props.params.id

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      location: { select: { name: true } },
      userGroup: { select: { name: true } },
    }
  })

  if (!user) {
    return <ResourceNotFound
      text="User Not Fonud"
      backHref='/user-management'
    />
  }


  return (
    <MainSection subpage>
      <header className="flex justify-between mb-8">
        <div>
          <Breadcrumb links={[{ href: "/user-management", label: "Users" }, { label: "Test" }]} />
          <h1>User Detail</h1>
        </div>
        <ResetPasswordDialogButton userid={user.id} />
        {/* <button className="primary self-end">✏️ Edit User</button> */}
      </header>
      <div className="flex gap-4">
        <div className="max-w-96 grow fcol gap-4">
          <section className="card card-big">
            <div className="bg-blue-600 h-28 -mx-6 -mt-6 rounded-t-xl" />
            <div className="bg-white w-24 h-24 rounded-full -mt-12 mx-auto relative">
              <Image unoptimized fill sizes="6rem" alt="" src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${ id }`} className="rounded-full p-1" />
            </div>
            <header className="grow fcenter fcol gap-1 my-6">
              <div className="font-semibold text-neutral-800">{user.firstName} {user.lastName}</div>
              <div className="text-neutral-600 text-sm">{user.userGroup.name}</div>
            </header>
            <hr />
            <table className="fields">
              <tbody>
                <tr><th>Status</th><td><div className="badge">Active</div></td></tr>
                <tr><th>Email</th><td>{user.email}</td></tr>
                <tr><th>Phone Number</th><td>{user.phoneNumber}</td></tr>
                <tr><th>Role Position</th><td>{user.position}</td></tr>
                <tr><th>Employee ID</th><td>{user.employeeId}</td></tr>
                <tr><th>Location</th><td>{user.location?.name}</td></tr>
                {/* <tr><th>Department</th><td>{user.email}</td></tr> */}
              </tbody>
            </table>
          </section>
          <section className="card card-big fcol gap-2 p-4">
            <button className="ghost justify-start font-normal">♻️ Reset Password</button>
            <button className="ghost destroy justify-start font-normal">🗑️ Delete User</button>
          </section>
        </div>

        <section className="card card-big grow">
          <header>Recent Activity</header>
          <div className="pt-4">
            {
              [
                { date: "15 December 2023 15:21", activity: "Create Work Order" },
                { date: "12 December 2023 10:00", activity: "Add New Asset" },
                { date: "10 December 2023 09:54", activity: "Set In Progress Work Order" },
                { date: "07 December 2023 16:21", activity: "Change Status Asset to Inactive" },
                { date: "03 December 2023 11:12", activity: "Ass New User" },
              ].map(activity => (
                <div key={activity.date} className="py-2">
                  <div className="text-sm text-neutral-400">{activity.date}</div>
                  <div>{activity.activity}</div>
                </div>
              ))
            }
          </div>
        </section>

      </div>
    </MainSection>
  )
}