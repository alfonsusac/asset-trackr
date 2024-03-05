"use client"

import { createForm } from "@/components/form-create"
import { Location, UserGroup } from "@prisma/client"
import { UserTableInfo } from "../../../page"
import { useRouter } from "next/navigation"
import { toastAction } from "@/lib/action-toast"
import { editUser } from "../../action"
import { Input } from "@/components/input"
import EasySelect from "@/components/select-easy"
import { SelectItem } from "@/components/select"

const {
  Form,
  getInputProps,
} = createForm({
  fields: {
    "first_name": { placeholder: "First Name", required: true },
    "last_name": { placeholder: "First Name", required: true },
    "role_position": { placeholder: "Enter role position" },
    "employee_id": { placeholder: "Enter Employee ID" },
    "phone": { type: "tel" },
    "picture": { type: "file" },
    "group": { type: "select", placeholder: "Select Groups", required: true },
    "location": { type: "select", placeholder: "Select Location" },
  }
})

export function EditUserForm(
  props: {
    data: UserTableInfo[number]
    groups: UserGroup[],
    locations: Location[],
  }
) {
  const router = useRouter()
  const { firstName, lastName, position, employeeId, phoneNumber, userGroup, location } = props.data

  return (
    <Form className="space-y-4 fcol" action={
      async (form) => {
        toastAction(editUser(props.data.id, {
          firstName: form.get('first_name'),
          lastName: form.get('last_name'),
          position: form.get('role_position'),
          employeeId: form.get('employee_id'),
          phoneNumber: form.get('phone'),
          userGroup: { connect: { id: form.get('group') } },
          location: form.get('location') === "" ? undefined : { connect: { id: form.get('location') } }
        }), {
          onSuccess: () => router.push(`/user-management/user/${props.data.id}`)
        })
      }
    }>
      <div className="card card-big">
        <header>User Informations</header>
        <hr />

        <fieldset>
          <label className="label-required">User Name</label>
          <div className="flex gap-2">
            <Input {...getInputProps('first_name')} defaultValue={firstName} />
            <Input {...getInputProps('last_name')} defaultValue={lastName} />
          </div>
        </fieldset>

        <fieldset>
          <label>Role Position</label>
          <Input {...getInputProps('role_position')} defaultValue={position ?? undefined} />
        </fieldset>

        <fieldset>
          <label>Employee ID</label>
          <Input {...getInputProps('employee_id')} defaultValue={employeeId ?? undefined} />
        </fieldset>

        <fieldset>
          <label>Number Phone</label>
          <Input {...getInputProps('phone')} defaultValue={phoneNumber ?? undefined} />
        </fieldset>

        <fieldset>
          <label>Profile Photo</label>
          <Input {...getInputProps('picture')} accept="image/jpg,image/png" />
        </fieldset>
      </div>
      <div className="card card-big">
        <header>Group User</header>
        <hr />

        <fieldset>
          <label className="label-required">Groups</label>
          <EasySelect {...getInputProps('group')} defaultValue={userGroup.id}>
            {
              props.groups.map(group =>
                <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>)
            }
          </EasySelect>
        </fieldset>

        <fieldset>
          <label>Location</label>
          <EasySelect {...getInputProps('location')} defaultValue={location?.id ?? undefined}>
            {
              props.locations.map(location =>
                <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>)
            }
          </EasySelect>
        </fieldset>

      </div>
      <button className="self-end primary px-12">Save</button>
    </Form>
  )
}