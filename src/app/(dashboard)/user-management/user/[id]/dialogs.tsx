"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog"
import { createForm } from "@/components/form-create"
import { Input } from "@/components/input"
import { toastAction } from "@/lib/action-toast"
import { useState } from "react"
import { deleteUser, resetPassword } from "../action"
import toast from "react-hot-toast"
import { DeleteAlert } from "@/components/alert"
import { useRouter } from "next/navigation"

const {
  Form,
  getInputProps,
} = createForm({
  fields: {
    newPassword: { type: "password", required: true },
    confirmNewPassword: { type: "password", required: true },
  }
})

export function ResetPasswordDialogButton(
  props: {
    userid: string
  }
) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="ghost justify-start font-normal">♻️ Reset Password</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        <div>
          <Form action={async (form) => {
            if (form.get('confirmNewPassword') === form.get('newPassword')) {
              toastAction(resetPassword(props.userid, form.get('newPassword')), {
                onSuccess: () => setOpen(false)
              })
            } else {
              toast.error('Password do not match')
            }
          }}>
            <fieldset>
              <label data-required>New Password</label>
              <Input {...getInputProps('newPassword')} />
              <small className="text-neutral-500 mb-2">Password must be at least 8 characters and contain numbers</small>
            </fieldset>

            <fieldset>
              <label data-required>Confirm New Password</label>
              <Input {...getInputProps('confirmNewPassword')} />
            </fieldset>

            <footer className="fcenter justify-end mt-8">
              <button className="primary ml-auto">Edit Password</button>
            </footer>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function DeleteUserDialogButton(
  props: {
    userid: string
  }
) {
  const router = useRouter()
  return (
    <DeleteAlert
      description=""
      onContinue={async () => {
        toastAction(deleteUser(props.userid), {
          onSuccess: () => router.push(`/user-management`)
        })
      }}
    >
      <button className="ghost destroy justify-start font-normal">🗑️ Delete User</button>
    </DeleteAlert>
  )
}