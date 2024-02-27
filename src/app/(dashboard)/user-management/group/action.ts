"use server"

import { action } from "@/lib/action"
import { prisma } from "@/lib/prisma"
import { Prisma, UserGroupPermission } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function deleteUserGroup(id: string) {
  try {
    await prisma.userGroup.delete({ where: { id } })

    return `✅ User Group Deleted`
  } catch (error: any) {
    return `🟥 Error: ${ error.message }`
  }
}

export const createUserGroup = action(
  async () => {
    const len = await prisma.userGroup.count()
    await prisma.userGroup.create({ data: { name: `New Group ${ len }` } })
    revalidatePath('/user-management', 'page')
    return "User Group Created"
  }
)

export const updateUserGroupInfo = action(
  async (
    id: string,
    data: Prisma.UserGroupUpdateInput
  ) => {
    await prisma.userGroup.update({ where: { id }, data })
    revalidatePath('/')
    return "User Group Updated"
  }
)

export const changeUserGroupPermission = action(
  async (
    id: string,
    type: "add" | "remove",
    permission: UserGroupPermission
  ) => {
    const data = await prisma.userGroup.findUnique({ where: { id } })
    if (!data)
      throw new Error("No User Group Found")

    const perms = new Set(data.permissions)

    if (type === "add") {
      perms.add(permission)
      await prisma.userGroup.update({
        where: { id },
        data: {
          permissions: {
            set: Array.from(perms)
          }
        }
      })
      revalidatePath('/')
      return `Permission "${ permission }" added to user group "${ data.name }"`
    }

    if (type === "remove") {
      perms.delete(permission)
      await prisma.userGroup.update({
        where: { id },
        data: {
          permissions: {
            set: Array.from(perms)
          }
        }
      })
      revalidatePath('/')
      return `Permission "${ permission }" removed to user group "${ data.name }"`
    }

    throw new Error("Unknown type")
  }
)