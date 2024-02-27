export function getLocaleDate(date: Date) {
  return (`${ date.toDateString() } ${ date.toTimeString().split(':').slice(0, 2).join(':') }`)
}