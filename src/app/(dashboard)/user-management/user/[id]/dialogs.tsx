"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog"
import { createForm } from "@/components/form-create"
import { Input } from "@/components/input"
import { useState } from "react"

const {
  Form,
  getInputProps,
} = createForm({
  fields: {
    newPassword: { type: "password", required: true },
    confirmNewPassowrd: { type: "password", required: true },
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
        <button className="primary self-end">✏️ Edit User</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        <div>
          <Form className="">
            <fieldset>
              <label data-required>New Password</label>
              <Input {...getInputProps('newPassword')} />
            </fieldset>

            <fieldset>
              <label data-required>Confirm New Password</label>
              <Input {...getInputProps('newPassword')} />
            </fieldset>

            <button>Edit Password</button>

          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}