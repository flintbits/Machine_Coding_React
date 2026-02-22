import { useEffect, useState } from 'react'

export default function useFetch<T>(url: string) {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        setLoading(true)
        const controller = new AbortController()
        async function fetchData(url: string) {
            try {
                const data = await fetch(url, { signal: controller.signal })

                // const json: T = await data.json()
                setData(data as T)
            } catch (e) {
                if (e instanceof DOMException && e.name === "AbortError") return
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

        fetchData(url)

        return () => controller.abort()

    }, [url])

    return { data, loading }
}
