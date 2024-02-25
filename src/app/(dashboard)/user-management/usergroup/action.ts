"use server"

import { action } from "@/lib/action"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteUserGroup(name: string) {
  try {
    await prisma.userGroup.delete({ where: { name } })

    return `✅ User Group Deleted`
  } catch (error: any) {
    return `🟥 Error: ${ error.message }`
  }
}



export const createUserGroup = action(
  async () => {
    const len = await prisma.userGroup.count()

    await prisma.userGroup.create({
      data: {
        name: `New Group ${ len }`,
        description: "",
        permissions: [],
      }
    })

    revalidatePath('/user-management', 'page')
    return "User Group Created"
  }
)