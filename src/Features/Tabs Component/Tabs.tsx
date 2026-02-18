import { Suspense, useEffect, useState } from 'react'
import type { TabsType } from './Tab.types'

type TabsProps = {
    tabs: TabsType[],
    startIndex: number,
    lazyLoad: boolean,
    unmountOnExit: boolean
}

function Tabs({ tabs, startIndex = 0, lazyLoad, unmountOnExit }: TabsProps) {
    const [ActiveIndex, setActiveIndex] = useState<number>(startIndex)
    const [visitedTabs, setVisitedTabs] = useState<Set<number>>(() => new Set([startIndex]))


    useEffect(() => {
        if (!lazyLoad) return
        setVisitedTabs((prev) => {
            const next = new Set(prev);
            next.add(ActiveIndex)
            return next
        })
    }, [ActiveIndex, lazyLoad])




    return (
        <div>
            <div role='tab-list'>{
                tabs.map((tab, index) =>
                    <button
                        key={tab.id}
                        type="button"
                        aria-selected={ActiveIndex === index}
                        aria-controls={`tabpanel-${index + 1}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <span>{tab.name}</span>
                    </button>)
            }</div>
            <div >
                {tabs.map((tab, index) => {

                    const Component = tab.component;

                    const isActive = index === ActiveIndex;

                    const shouldRender = lazyLoad ? visitedTabs.has(index) : true

                    if (unmountOnExit && !isActive) {
                        return null
                    }

                    if (!shouldRender) return null

                    return <div key={tab.id}
                        role='tab-pannel'
                        id={`tabpannel-${tab.id}`}
                        style={{ display: index === ActiveIndex ? "block" : "none" }}
                    >
                        <Suspense fallback={<p>Loading...</p>}>
                            <Component />
                        </Suspense>
                    </div>

                })}
            </div>
        </div >
    )
}

export default Tabs