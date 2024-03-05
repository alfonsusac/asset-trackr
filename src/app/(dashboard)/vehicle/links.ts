export const vehicleRoute = {
  list: "/vehicle",
  create: "/vehicle/create",
  detail: (id: string) => "/vehicle/" + id,
  update: (id: string) => "/vehicle/" + id + "/update",
  history: (id: string) => "/vehicle/" + id + "/history"
}