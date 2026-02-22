import type { CheckboxType } from "./checkbox.types";

const checkboxes: CheckboxType[] = [
    {
        id: 1,
        title: "Checkbox 1",
        checked: false
    },
    {
        id: 2,
        title: "Checkbox 2",
        checked: false,
        children: [
            {
                id: 3,
                title: "Checkbox 2-1",
                checked: false
            },
            {
                id: 4,
                title: "Checkbox 2-2",
                checked: false
            },
        ]
    },
    {
        id: 5,
        title: "Checkbox 3",
        checked: false,
        children: [
            {
                id: 6,
                title: "Checkbox 3-1",
                checked: false,
                children: [
                    {
                        id: 7,
                        title: "Checkbox 3-1-1",
                        checked: false,
                        children: [
                            {
                                id: 8,
                                title: "Checkbox 3-1-1-1",
                                checked: false
                            },
                            {
                                id: 9,
                                title: "Checkbox 3-1-1-2",
                                checked: false
                            },
                        ]
                    },
                ]
            }

        ]
    }
]


export function fetchCheckboxes(): Promise<CheckboxType[]> {
    return new Promise((res) => setTimeout(() => res(checkboxes), 100))
}