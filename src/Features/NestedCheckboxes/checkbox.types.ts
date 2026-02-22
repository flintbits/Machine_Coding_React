type Checkboxbase = {
    id: number
    title: string
    checked: boolean
}


export type CheckboxType =
    | (Checkboxbase & { children?: never })
    | (Checkboxbase & { children: CheckboxType[] })


export type CheckboxAction =
    | { type: "SET_CHECKBOXES", payload: CheckboxType[] }
    | { type: "TOGGLE_CHECK", payload: number }