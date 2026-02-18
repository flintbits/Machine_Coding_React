import type { ListType } from "./List.types"
import VirtualList from "./VirtualList"

const ListItems: ListType[] = new Array(100000)
    .fill(null)
    .map((_, index) => ({ id: index, item: `Item::${index}` }))

export default function VirtualListComponent() {
    console.log(ListItems)
    return (
        <div>
            <p aria-label="Demo of Virtual List">Virtualization demo</p>

            <VirtualList
                list={ListItems}
                height={500}
                itemHeight={40}
                overscan={8}
                renderItem={(item) => <div style={{ padding: 20 }}>{item.item}</div>}
                keyExtractor={(item) => item.id}
            />
        </div>
    )
}
