"use server"

import { action } from "@/lib/action"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const createSubLocation = action(
  async (
    locationid: string,
    data: Prisma.SubLocationsCreateWithoutParentLocationInput
  ) => {
    const subloc = await prisma.subLocations.create({
      data: {
        ...data,
        parentLocation: {
          connect: { id: locationid }
        }
      }
    })
    revalidatePath('/')
    return `Sublocation ${ subloc.name } created`
  }
)

export const editSubLocation = action(
  async (
    id: string,
    data: Prisma.SubLocationsUpdateInput
  ) => {
    const subloc = await prisma.subLocations.update({
      where: { id },
      data
    })
    revalidatePath('/')
    return `Sublocation ${ subloc.name } edited`
  }
)

export const deleteSubLocation = action(
  async (
    id: string,
  ) => {
    const subloc = await prisma.subLocations.delete({ where: { id } })
    revalidatePath('/')
    return `Sublocation ${ subloc.name } delete`
  }
)