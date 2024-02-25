"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function editTyreConfiguration(
  id: string,
  data: Prisma.TyreConfigurationUpdateInput
) {
  try {
    await prisma.tyreConfiguration.update({
      where: { id },
      data
    })
    revalidatePath('/')
    return `✅ Tyre Configuration Updated`
  } catch (error: any) {
    return `🟥 Error: ${ error.message }`
  }
}