import type { Validator } from "./form.types";


export const required: Validator = (value, fieldName) => {
    if (value.trim().length === 0) {
        return `${fieldName} is required`;
    }
    return null;
};

export function minLength(min: number): Validator {
    return function (value: string, fieldName: string) {
        if (value.length < min) {
            return `${fieldName} must be at least ${min} characters`;
        }
        return null;
    }
}


/*
Without even naming them, you applied:
    Single Responsibility Principle
    Open/Closed Principle
    Functional composition
    Pure functions
    Immutability
    Separation of concerns
    Interviewers recognize this instantly.
*/