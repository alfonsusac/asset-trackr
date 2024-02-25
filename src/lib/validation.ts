export function toInt(str: string) {
  const num = parseInt(str)
  if (Number.isNaN(num)) {
    throw new Error(`${str} is not a number!`)
  }
  return num
}