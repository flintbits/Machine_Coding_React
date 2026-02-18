import { useEffect, useState } from 'react'


export default function useDebounce(value: string, delay: number = 700) {
    const [debouncedValue, setDebuncedValue] = useState<string>(value)

    useEffect(() => {
        const id = setTimeout(() => {
            setDebuncedValue(value)
        }, delay)

        return () => clearTimeout(id)
    }, [value, delay])

    return debouncedValue
}
