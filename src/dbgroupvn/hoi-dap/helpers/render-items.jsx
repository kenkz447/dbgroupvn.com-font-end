import React from 'react'
import { SidebarWidget } from '../../shared/components'

export default function renderItem(open, quest, answer) {
    return (
        <div className="pb-4">
            <SidebarWidget title={ quest } titleClassName="m-0 text-gray" className="p-0 text-gray" noBorder toggleDefault={ open }>
                <p>
                    { answer }
                </p>
            </SidebarWidget>
        </div>

    )
}