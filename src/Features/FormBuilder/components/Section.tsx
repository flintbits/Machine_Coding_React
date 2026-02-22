import React, { useState } from 'react'
import type { InputSchemaType } from '../FormBuilder.types'

export default function Section() {
    const [inputSchema, setInputSchema] = useState<InputSchemaType | null>(null)
    return (
        <div>Section</div>
    )
}
