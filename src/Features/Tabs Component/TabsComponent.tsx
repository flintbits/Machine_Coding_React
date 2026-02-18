import React from 'react'
import Tabs from './Tabs'
import type { TabsType } from './Tab.types'


const TABS: TabsType[] = [
    {
        id: 1,
        name: "Tab 1",
        component: React.lazy(() => import('./Components/Tab1'))
    },
    {
        id: 2,
        name: "Tab 2",
        component: React.lazy(() => import('./Components/Tab2'))
    },
    {
        id: 3,
        name: "Tab 3",
        component: React.lazy(() => import('./Components/Tab3'))
    }
]

type Props = {}

export default function TabsComponent({ }: Props) {
    return (
        <div>
            <p>Tabs Component</p>
            <Tabs
                tabs={TABS}
                startIndex={0}
                lazyLoad={true}
                unmountOnExit={true}
            />
        </div>
    )
}