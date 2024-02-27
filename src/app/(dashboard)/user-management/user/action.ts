import { action } from "@/lib/action"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const deleteUser = action(
  async (id: string) => {
    const user = await prisma.user.delete({ where: { id } })
    revalidatePath('/')
    return `User "${user.username}" deleted!`
  }
)

export const createUser = action(
  async (data: Prisma.UserCreateInput) => {
    const user = await prisma.user.create({ data })
    revalidatePath('/')
    return `User "${user.username}" created!`
  }
)