"use server"

import { action } from "@/lib/action"

export const createVehicle = action(async function () {

})
export const deleteVehicle = action(async function (data: string) {

})
export const updateVehicle = action(async function () {

})

// ----

export const connectAttachedVehicle = action(async function (
  thisOne: string,
  thatOne: string
) {

})

export const disconnectAttachedVehicle = action(async function (
  thisOne: string,
  thatOne: string
) {

})

// ---

export const linkOtherAsset = action(async function (
  vehicleid: string,
  assetId: string,
) {

})
export const unlinkOtherAsset = action(async function (
  vehicleid: string,
  assetId: string,
) {

})


