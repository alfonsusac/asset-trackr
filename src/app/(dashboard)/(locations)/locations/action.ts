"use server"

import { action } from "@/lib/action"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"


export const createLocation = action(
  async (
    data: Prisma.LocationCreateInput
  ) => {
    const location = await prisma.location.create({ data })
    revalidatePath('/')
    return `Location ${ location.name } created`
  }
)

export const deleteLocation = action(
  async (
    id: string
  ) => {
    const sublocs = await prisma.subLocations.deleteMany({ where: { parentLocationID: id } })
    const location = await prisma.location.delete({ where: { id } })
    revalidatePath('/')
    return `Location ${ location.name } deleted, ${sublocs.count} sublocations deleted`
  }
)

export const editLocation = action(
  async (
    id: string,
    data: Prisma.LocationUpdateInput
  ) => {
    const location = await prisma.location.update({ where: { id }, data })
    revalidatePath('/')
    return `Location ${ location.name } updated`
  }
)