export function getString(form: FormData, key: string, optional?: true) {
  const res = form.get(key)
  if (typeof res !== "string") {
    throw new Error(`Field ${key} must be a string`)
  }
  if (!res) {
    if (optional) {
      return ""
    } else {
      throw new Error(`Field ${key} is required`)
    }
  }
  return res
}