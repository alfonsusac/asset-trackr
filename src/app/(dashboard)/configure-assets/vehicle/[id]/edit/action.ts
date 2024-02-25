"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function editVehicleConfiguration(
  id: string,
  data: Prisma.VehicleAssetConfigurationUpdateInput
) {
  try {
    await prisma.vehicleAssetConfiguration.update({
      where: { id }, 
      data
    })
    revalidatePath('/')
    return `✅ Vehicle Configuration Updated`
  } catch (error: any) {
    return `🟥 Error: ${ error.message }`
  }
}