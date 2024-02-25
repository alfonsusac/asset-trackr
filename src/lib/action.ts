export function action<
  R extends any[],
>(
  cb: (...args: R) => Promise<string>,
) {
  return async (...args: R) => {
    try {
      const data = await cb(...args)
      return data ?? "✅ Done"
    } catch (error: any) {
      return `🟥 Error: ${ error.message }`
    }
  }
}