"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function editVehicleBodyTypeConfiguration(
  id: string,
  data: Prisma.VehicleBodyTypeAssetConfigurationUpdateInput
) {
  try {
    await prisma.vehicleBodyTypeAssetConfiguration.update({
      where: { id },
      data
    })
    revalidatePath('/')
    return `✅ Vehicle Body Type Configuration Updated`
  } catch (error: any) {
    return `🟥 Error: ${ error.message }`
  }
}