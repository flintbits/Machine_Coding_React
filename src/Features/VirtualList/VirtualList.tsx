import React, { useState } from 'react'
import type { ListType } from './List.types'

type VirtualListProps = {
    list: ListType[]
    height: number
    itemHeight: number
    overscan: number
    renderItem: (item: ListType, index: number) => React.ReactNode
    keyExtractor: (item: ListType) => number
}
export default function VirtualList({ list, height, itemHeight, overscan, renderItem, keyExtractor }: VirtualListProps) {

    const [scrollTop, setScrollTop] = useState(0);

    const totalHeight = list.length * itemHeight;

    const visibleCount = Math.ceil(height / itemHeight);

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);

    const endIndex = Math.min(list.length, startIndex + visibleCount + overscan * 2)

    const visibleItems = list.slice(startIndex, endIndex);

    const offsetY = startIndex * itemHeight;

    return (
        <div style={{ height: height, overflow: "auto", width: 200, border: "1px black solid" }}
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        >
            <div style={{ height: totalHeight, position: "relative" }}>

                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    transform: `translateY(${offsetY}px)`
                }}>

                    {visibleItems.map((l, i) => {
                        const index = startIndex + i
                        return <div key={keyExtractor(l)} style={{ height: itemHeight }}>
                            {renderItem(l, index)}
                        </div>
                    }
                    )}
                </div>
            </div>
        </div>

    )
}
