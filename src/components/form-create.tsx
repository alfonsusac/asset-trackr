import { ComponentPropsWithoutRef, HTMLInputTypeAttribute } from "react"

type Form = {
  fields: {
    [fieldName: string]: {
      type?: HTMLInputTypeAttribute | "select",
      label?: string,
      required?: boolean,
      placeholder?: string,
    },
  },
}


type FormShape = {
  [fieldName: string]: HTMLInputTypeAttribute
}

type FormDataEntryInputValue<Shape extends FormShape, Key extends keyof Shape> = Shape[Key] extends "file" | "image" ? Blob : string
type FormDataEntryValue<Shape extends FormShape, Key extends keyof Shape> = Shape[Key] extends "file" | "image" ? File : string
type FormDataTyped<TShape extends FormShape> = {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/append) */
  append<TKey extends keyof TShape>(name: TKey, value: FormDataEntryInputValue<TShape, TKey>): void
  append<TKey extends keyof TShape>(name: TKey, value: FormDataEntryInputValue<TShape, TKey>): void
  append<TKey extends keyof TShape>(name: TKey, blobValue: Blob, filename?: string): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/delete) */
  delete<TKey extends keyof TShape>(name: TKey): void
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/get) */
  get<TKey extends keyof TShape>(name: TKey): FormDataEntryValue<TShape, TKey>
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/getAll) */
  getAll<TKey extends keyof TShape>(name: TKey): FormDataEntryValue<TShape, TKey>[]
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/has) */
  has<TKey extends keyof TShape>(name: TKey): boolean
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/set) */
  set<TKey extends keyof TShape>(name: TKey, value: FormDataEntryInputValue<TShape, TKey>): void
  set<TKey extends keyof TShape>(name: TKey, value: FormDataEntryInputValue<TShape, TKey>): void
  set<TKey extends keyof TShape>(name: TKey, blobValue: Blob, filename?: string): void
  forEach(callbackfn: <TKey extends keyof TShape>(value: FormDataEntryInputValue<TShape, TKey>, key: TKey, parent: FormDataTyped<TShape>) => void, thisArg?: any): void
}

// const e = {} as FormDataTyped<{
//   "field1": "text"
// }>

export function createForm<TForm extends Form>(form: TForm) {
  type Key = keyof TForm['fields'] extends (string | number) ? keyof TForm['fields'] : never
  type TypedFormData = FormDataTyped<{ [Field in Key]: TForm['fields'][Field]['type'] extends string ? TForm['fields'][Field]['type'] : "text"  }>

  return {
    // Utils
    getInputProps(fieldName: Key) {
      const { type, placeholder, required } = form.fields[fieldName] 

      return {
        name: fieldName + '',
        type: type === "select"
          ? undefined 
          : form.fields[fieldName].type ?? "text",
        placeholder: placeholder,
        required: required,
      }
    },
    getLabel(fieldName: Key) {
      return form.fields[fieldName].label
    },

    // Components
    Form: (props: Omit<ComponentPropsWithoutRef<"form">, "action"> & {
      action?: (formData: TypedFormData) => void
    }) => {
      return <form {...props} action={props.action as () => void}>
        {props.children}
      </form>
    },

    // Debugging
    _testTypedFormData: {} as TypedFormData
  }
}


// const x = <Form action={(formData) => {
//   const e = formData.get('first_name')
// }}></Form>

export function field(key: string, label: string, type: HTMLInputTypeAttribute, placeholder: string) {
  return {
    key, label, type, placeholder
  }
}