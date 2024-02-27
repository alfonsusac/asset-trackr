"use client"

import { createForm } from "@/components/form-create"
import { Input } from "@/components/input"
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/select"
import EasySelect from "@/components/select-easy"
import { toastAction } from "@/lib/action-toast"
import { Location, UserGroup } from "@prisma/client"
import { createUser } from "../user/action"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const {
  Form, // action={} are now typed.
  getInputProps, // name="" are now typed
} = createForm({
  fields: {
    "first_name": { placeholder: "First Name", required: true },
    "last_name": { placeholder: "First Name", required: true },
    "role_position": { placeholder: "Enter role position" },
    "employee_id": { placeholder: "Enter Employee ID" },
    "email": { placeholder: "Enter email", type: "email" },
    "phone": { type: "tel" },
    "picture": { type: "file" },
    "group": { type: "select", placeholder: "Select Groups", required: true },
    "location": { type: "select", placeholder: "Select Location" },
    "password": { type: "password", placeholder: "Enter new password", required: true },
  }
})

export function AddNewUserForm(
  props: {
    groups: UserGroup[],
    locations: Location[],
  }
) {
  const router = useRouter()

  return (
    <Form className="space-y-4 fcol" action={
      async (form) => {
        toast(JSON.stringify(form.get('location') === "" ? undefined : form.get('location')))
        toastAction(createUser({
          firstName: form.get('first_name'),
          lastName: form.get('last_name'),
          position: form.get('role_position'),
          employeeId: form.get('employee_id'),
          email: form.get('email'),
          phoneNumber: form.get('phone'),
          password: form.get('first_name'),
          userGroup: { connect: { id: form.get('group') } },
          location: form.get('location') === "" ? undefined : { connect: { id: form.get('location') } }
          // location: { connect: { id: form.get('location') === "" ? undefined : form.get('location') } }
        }), {
          onSuccess: () => router.push('/user-management')
        })
      }
    }>
      <div className="card card-big">
        <header>User Informations</header>
        <hr />

        <fieldset>
          <label className="label-required">User Name</label>
          <div className="flex gap-2">
            <Input {...getInputProps('first_name')} />
            <Input {...getInputProps('last_name')} />
          </div>
        </fieldset>

        <fieldset>
          <label>Role Position</label>
          <Input {...getInputProps('role_position')} />
        </fieldset>

        <fieldset>
          <label>Employee ID</label>
          <Input {...getInputProps('employee_id')} />
        </fieldset>

        <fieldset>
          <label className="label-required">Email</label>
          <Input {...getInputProps('email')} />
        </fieldset>

        <fieldset>
          <label>Number Phone</label>
          <Input {...getInputProps('phone')} />
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
          <EasySelect {...getInputProps('group')}>
            {
              props.groups.map(group =>
                <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>)
            }
          </EasySelect>
        </fieldset>

        <fieldset>
          <label>Location</label>
          <EasySelect {...getInputProps('location')}>
            {
              props.locations.map(location =>
                <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>)
            }
          </EasySelect>
        </fieldset>

      </div>

      <div className="card card-big">
        <header>Set New Password</header>
        <hr />

        <fieldset>
          <label>New Password</label>
          <Input {...getInputProps('password')} accept="image/jpg,image/png" />
          <small className="text-neutral-400">Password must be at least 8 characters and contain numbers</small>
        </fieldset>

      </div>

      <button className="self-end primary px-12">Create</button>
    </Form >
  )
}