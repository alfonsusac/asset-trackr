"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export default async function deleteVehicleConfiguration(id: string) {
  try {
    await prisma.vehicleAssetConfiguration.delete({
      where: { id },
    })
    revalidatePath('/')
    return `✅ Vehicle Body Type Configuration Deleted`
  } catch (error: any) {
    return `🟥 Error: ${ error.message }`
  }
}