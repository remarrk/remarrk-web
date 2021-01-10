import React from 'react'
// import '../styles/tag.scss';

function Tag({ tagName, isTagActive, isEditingRemark}) {
    return (
        isEditingRemark ?
            isTagActive ? <button class="btn-rect btn-blue">{tagName}</button>
                        : <button class="btn-rect btn-blue-outline">{tagName}</button>
            : <button class="btn-rect btn-peach">{tagName}</button>
    )
}

export default Tag
