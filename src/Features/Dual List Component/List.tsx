import type { ListItem, Selected } from "./List.types"


type ListProps = {
    items: ListItem[]
    selected: Selected | null
    onSelect: (id: number) => void
}

export default function List({ items, selected, onSelect }: ListProps) {

    return (
        <div
            role="listbox"
            style={{ width: 200, height: 400, border: "1px solid black", padding: 6, overflowY: 'auto' }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        tabIndex={0}
                        role="option"
                        aria-selected={selected?.id === item.id}
                        style={{ background: selected?.id === item.id ? "#90D5FF" : "#ddd", padding: 10, cursor: "pointer" }}
                        onClick={() => onSelect(item.id)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                onSelect(item.id)
                            }
                        }}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
