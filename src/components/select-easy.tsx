import { ReactNode } from "react"
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select"

export default function EasySelect(
  props: {
    name: string,
    defaultValue?: string,
    placeholder?: string,
    children?: ReactNode,
    required?: boolean,
  }
) {

  return (
    <Select name={props.name} defaultValue={props.defaultValue} required={props.required}>
      <SelectTrigger>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.children}
      </SelectContent>
    </Select>
  )
}