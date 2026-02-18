import { useEffect, useState } from 'react'
import useDebounce from './useDebounce';

type Props = {}

export default function AutocompleteComponent({ }: Props) {
    const [query, setQuery] = useState<string>("");
    const [searchText, setSearchText] = useState<string>("");
    const [products, setProducts] = useState<any[]>([])
    const [showDropDown, setShowDropDown] = useState<boolean>(false)
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const activeId = activeIndex >= 0 ? `fruit-option-${activeIndex}` : undefined

    const debouncedQuery = useDebounce(query, 700)

    useEffect(() => {
        //Skip the fetch when the query is empty
        if (!debouncedQuery.trim()) {
            setProducts([]);
            return
        }

        //Abort controler to stop the client side background fetch on effect unmount
        const controller = new AbortController()
        async function fetchProducts(): Promise<void> {
            try {
                const res = await fetch(`https://fruit-search.freecodecamp.rocks/api/fruits?q=${encodeURIComponent(debouncedQuery)}`, { signal: controller.signal });
                if (!res.ok) {
                    throw new Error("Cannot fetch the products")
                }
                const data = await res.json();
                setProducts(data)
                setShowDropDown(true)
            } catch (e: any) {
                //skip the error if its comming from Abort Controller
                if (e.name === "AbortError") return
                console.error("Error while fetching products ", e)
            }
        }

        fetchProducts();

        return () => controller.abort();
    }, [debouncedQuery])

    function highlightText(text: string) {
        const index = text.toLowerCase().indexOf(debouncedQuery.toLowerCase());
        if (index === -1) return text;

        const startText = text.slice(0, index);
        const midText = text.slice(index, index + debouncedQuery.length);
        const endText = text.slice(index + debouncedQuery.length);

        return <div>
            <span>{startText}</span>
            <span style={{ color: "red" }}>{midText}</span>
            <span>{endText}</span>
        </div>
    }

    const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Input search text :: ", searchText)
    }

    const handleKeyboardNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropDown) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => prev < products.length - 1 ? prev + 1 : 0)
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => prev > 0 ? prev - 1 : 0)
        }

        if (e.key === "Enter") {
            if (activeIndex >= 0) {
                e.preventDefault();
                setSearchText(products[activeIndex].name);
                setShowDropDown(false)
            }
        }

        if (e.key === "Escape") {
            setShowDropDown(false)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column", }}>
            <div style={{ position: "relative", maxWidth: 600 }}>

                <form onSubmit={handleSearch}>
                    <input
                        role="combobox"
                        aria-autocomplete='list'
                        aria-expanded={showDropDown}
                        aria-controls='fruit-listbox'
                        aria-activedescendant={activeId}
                        value={searchText}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setSearchText(e.target.value)
                            setActiveIndex(-1)
                        }}
                        type='text'
                        placeholder='Search....'
                        style={{ height: 16, padding: 20, width: 300 }}
                        onKeyDown={handleKeyboardNavigation}
                    />

                    <button
                        type='submit'
                        role="submit"
                        style={{ height: 16 * 3.8, width: 200 }}
                    >Search</button>
                </form>
                {showDropDown && products.length > 0 &&
                    <ul
                        role="listbox"
                        id="fruit-listbox"
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            width: "100%",
                            height: 500,
                            overflow: 'auto',
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                            zIndex: 1000
                        }}
                    >
                        {products.map((product, index) => {
                            const isActive = index === activeIndex
                            return (
                                <li
                                    id={`fruit-option-${index}`}
                                    role="option"
                                    aria-selected={isActive}
                                    key={index}
                                    style={{
                                        background: isActive ? "#bbb" : "#ddd",
                                        padding: 12,
                                        margin: 6,
                                        cursor: 'pointer'
                                    }}
                                    onMouseDown={() => {
                                        setSearchText(product.name);
                                        setProducts([]);
                                        setShowDropDown(false);
                                    }}
                                >
                                    {highlightText(product.name)}
                                </li>
                            )
                        })
                        }
                    </ul>
                }
            </div>
        </div>
    )
}