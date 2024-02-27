import toast from "react-hot-toast"
import { ServerActionResponse } from "./action"

export function toastAction<T>(promise: Promise<ServerActionResponse<T>>, opts?: {
  onError?: (error: any) => void,
  onSuccess?: (data: string) => void
}) {
  return toast.promise((async () => {
    const data = await promise
    if (data.error) {
      throw new Error(data.error)
    }
    return data
  })(), {
    error: (error) => {
      opts?.onError?.(error)
      return `Error: ${ error.message }`
    },
    loading: "Loading",
    success: (data) => {
      opts?.onSuccess?.(data.message)
      return data.message
    }
  })
}

/**
Feedbacks:
- not usable if you want to do something else only after promise success





 */