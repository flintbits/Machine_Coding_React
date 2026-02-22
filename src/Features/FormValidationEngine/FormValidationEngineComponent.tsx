import React, { useCallback, useMemo, useState } from 'react'
import { FORM_CONFIG } from './form.config'
import type { FieldType } from './form.types'
import { attachValidators } from './attachValidators'

export default function FormValidationEngineComponent() {

    const formConfig: FieldType[] = useMemo(() => FORM_CONFIG.map(attachValidators), [])


    const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
    const [errors, setErrors] = useState<Record<string, string>>({})

    const runValidations = (value: string, field: FieldType): string | null => {
        if (!field.validations) return null;

        for (const validate of field.validations) {
            const error = validate(value, field.label);
            if (error) return error;
        }

        return null;
    };


    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
        const val = e.target.value.trim();

        setFieldValues((prev) => ({ ...prev, [fieldId]: val }))


        const fieldConfig = formConfig.find((f) => f.id === fieldId);

        if (!fieldConfig) return;

        const error = runValidations(val, fieldConfig);

        setErrors((prev) => ({
            ...prev,
            [fieldId]: error ?? "",
        }));

    }, [])



    return (
        <div style={styles.formContainer}>
            <h1>Form Validation wirh verification Engine</h1>

            <form>
                {formConfig.map((field) => <div style={styles.fieldContainer}>
                    <label key={field.id}>{field.label}</label>
                    <input
                        id={field.id}
                        type={field.type}
                        value={fieldValues[field.id] ?? ""}
                        placeholder={field.placeHolder}
                        style={styles.input}
                        onChange={(e) => handleChange(e, field.id)}
                    />
                    {errors[field.id] && <span style={styles.error}>{errors[field.id]}</span>}
                </div>)}
                <button style={styles.btn}>Submit</button>
            </form>
            <pre>
                {JSON.stringify(fieldValues, null, 2)}
            </pre>
        </div >
    )
}


const styles: Record<string, React.CSSProperties> = {
    formContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "600px",
        margin: "0 auto",
        background: "#ddd",
        padding: 8
    },
    fieldContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
        gap: 8,
        marginTop: 12

    },
    input: {
        width: "500px",
        height: "20px",
        padding: 2
    },
    error: {
        color: "red"
    },
    btn: {
        marginTop: 10,
        height: 40,
        width: 200
    }
}