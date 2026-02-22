import type { Validator } from "./form.types";
import { minLength, required } from "./Validations";

export const validatorRegistry: Record<string, (...args: any[]) => Validator> = {
    required: () => required,
    minLength: (min: number) => minLength(min)
}