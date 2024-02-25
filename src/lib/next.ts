
// https://stackoverflow.com/questions/73591609/how-to-create-object-keys-from-array-values-in-typescript
export type PageProps<TParam extends readonly string[]> = {
  params: {
    [key in TParam[number]]: string
  },
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}