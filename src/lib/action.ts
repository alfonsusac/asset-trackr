export function action<
  R extends any[],
  T
>(
  cb: (...args: R) => Promise<T>,
) {
  return async (...args: R): Promise<ServerActionResponse<T>> => {
    try {
      const data = await cb(...args)
      return {
        error: null,
        message: typeof data === "string" ? data : "Success!", 
        return: data
      }
    } catch (error: any) {
      console.log(error)
      return {
        error: `Error: ${ error.message } `,
      }
    }
  }
}


export type ServerActionResponse<T> = {
  error: `${ string } `
} | {
  error: null
  message: string
  return: T
}

// const response = 0 as unknown as ServerActionResponse<string>
// if (!response.error) {
//   response
//   // ^?
// }
// if (response.error) {
//   response
//   // ^?
// }
