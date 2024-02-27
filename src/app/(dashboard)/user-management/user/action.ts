"use server"

import { action } from "@/lib/action"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const createUser = action(
  async (data: Prisma.UserCreateInput) => {
    const user = await prisma.user.create({ data })
    revalidatePath('/')
    return `User "${ user.firstName } ${ user.lastName }" created!`
  }
)

export const deleteUser = action(
  async (id: string) => {
    const user = await prisma.user.delete({ where: { id } })
    revalidatePath('/')
    return `User "${ user.firstName } ${ user.lastName }" deleted!`
  }
)

export const editUser = action(
  async (id: string, data: Prisma.UserUpdateInput) => {
    const user = await prisma.user.update({ data, where: { id } })
    revalidatePath('/')
    return `User "${ user.firstName } ${ user.lastName }" updated!`
  }
)

export const resetPassword = action(
  async (id: string, newPassword: string) => {
    const user = await prisma.user.update({ data: { password: newPassword }, where: { id } })
    throw new Error(`Password resetted for "${ user.firstName } ${ user.lastName }" `)
  }
)