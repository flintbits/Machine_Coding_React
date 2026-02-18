import { useState } from "react"
import List from "./List"
import type { ListItem, Selected } from "./List.types"

const ListItemLeft: ListItem[] = [
    {
        id: 1,
        name: "Left-Item-1"
    },
    {
        id: 2,
        name: "Left-Item-2"
    },
    {
        id: 3,
        name: "Left-Item-3"
    },
    {
        id: 4,
        name: "Left-Item-4"
    }, {
        id: 5,
        name: "Left-Item-5"
    }
]

const ListItemRight: ListItem[] = [
    {
        id: 6,
        name: "Right-Item-1"
    },
    {
        id: 7,
        name: "Right-Item-2"
    },
    {
        id: 8,
        name: "Right-Item-3"
    },
    {
        id: 9,
        name: "Right-Item-4"
    }, {
        id: 10,
        name: "Right-Item-5"
    }
]

export default function DualListComponent() {
    const [leftItems, setLeftItems] = useState<ListItem[]>(ListItemLeft)
    const [rightItems, setRightItems] = useState<ListItem[]>(ListItemRight)

    const [selected, setSelected] = useState<Selected | null>(null)

    const fetchItem = (list: ListItem[], selectedId: number) => {
        return list.find((item) => item.id === selectedId)
    }

    const handleMoveLeft = () => {
        if (selected === null || selected.side === "left") return

        const newItem = fetchItem(rightItems, selected.id)

        if (!newItem) return

        setRightItems((prev) => {
            return prev.filter((item) => item.id !== selected.id)
        })

        setLeftItems((prev) => [...prev, newItem])
        setSelected(null)
    }

    const handleMoveRight = () => {
        if (selected === null || selected.side === "right") return

        const newItem = fetchItem(leftItems, selected.id)
        if (!newItem) return

        setLeftItems((prev) => {
            return prev.filter((item) => item.id !== selected.id)
        })

        setRightItems((prev) => [...prev, newItem])
        setSelected(null)
    }

    return (
        <div aria-label="Dual list transfer component">
            <p>Dual List Component</p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>

                <List items={leftItems} selected={selected} onSelect={(id) => setSelected({ id, side: "left" })} />

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 6 }}>
                    <button
                        aria-label="Move selected item to left list"
                        onClick={handleMoveLeft}
                        disabled={selected === null || selected?.side === "left"}
                    >
                        move left
                    </button>
                    <button
                        aria-label="Move selected item to right list"
                        onClick={handleMoveRight}
                        disabled={selected === null || selected?.side === "right"}
                    >
                        move right
                    </button>
                </div>
                <List
                    items={rightItems}
                    selected={selected}
                    onSelect={(id) => setSelected({ id, side: "right" })}
                />
            </div>
        </div>
    )
}
