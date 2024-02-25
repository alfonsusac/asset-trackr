"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createTyreConfiguration(
  data: Prisma.TyreConfigurationCreateInput
) {
  try {
    await prisma.tyreConfiguration.create({ data })
    revalidatePath('/')
    return `✅ New Tyre Configuration Added`
  } catch (error: any) {
    return `🟥 Error: ${ error.message }`
  }
}