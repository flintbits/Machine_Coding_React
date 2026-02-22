export type Validator = (value: string, fieldName: string) => string | null

export type ValidationConfig =
    | { type: "required" }
    | { type: "minLength", value: number }

export type FieldFromApi = {
    id: string,
    type: string,
    label: string,
    placeHolder: string,
    validations?: ValidationConfig[]
}

export type FieldType = Omit<FieldFromApi, "validations"> & {
    validations?: Validator[];
};