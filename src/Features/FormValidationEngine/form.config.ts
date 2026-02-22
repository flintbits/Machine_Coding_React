import type { FieldFromApi } from "./form.types";

export const FORM_CONFIG: FieldFromApi[] = [
    {
        id: "fName",
        type: "text",
        label: "First Name",
        placeHolder: "Enter your First Name",
        validations: [{ type: "required" }],
    },
    {
        id: "lName",
        type: "text",
        label: "Last Name",
        placeHolder: "Enter your Last Name",
        validations: [
            { type: "required" },
            { type: "minLength", value: 3 },
        ],
    }
]