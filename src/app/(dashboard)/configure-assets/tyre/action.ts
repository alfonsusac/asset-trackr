"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export default async function deleteTyreConfiguration(id: string) {
  try {
    await prisma.tyreConfiguration.delete({
      where: { id },
    })
    revalidatePath('/')
    return `✅ Tyre Configuration Deleted`
  } catch (error: any) {
    return `🟥 Error: ${ error.message }`
  }
}