import type { FieldFromApi, FieldType } from "./form.types";
import { validatorRegistry } from "./validatorRegistry";

export function attachValidators(field: FieldFromApi): FieldType {
    return {
        ...field,
        validations: field.validations?.map((rule) => {
            const factory = validatorRegistry[rule.type]

            if ("value" in rule) {
                return factory(rule.value)
            }

            return factory();
        })
    }
}
