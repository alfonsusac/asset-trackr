"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createVehicleBodyTypeConfiguration(
  data: Prisma.VehicleBodyTypeAssetConfigurationCreateInput
) {
  try {
    await prisma.vehicleBodyTypeAssetConfiguration.create({ data })
    revalidatePath('/')
    return `✅ New Vehicle Body Type Configuration Added`
  } catch (error: any) {
    return `🟥 Error: ${ error.message }`
  }
}