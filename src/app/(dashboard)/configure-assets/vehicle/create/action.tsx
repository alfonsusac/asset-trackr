"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createVehicleConfiguration(
  data: Prisma.VehicleAssetConfigurationCreateInput
) {
  try {
    await prisma.vehicleAssetConfiguration.create({ data })
    revalidatePath('/')
    return `✅ New Vehicle Configuration Added`
  } catch (error: any) {
    return `🟥 Error: ${ error.message }`
  }
}