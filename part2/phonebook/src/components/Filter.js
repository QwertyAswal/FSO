import React from 'react'

const Filter = ({ filterText, handleFilterChange }) => {
    return (
        <div>
            filter shown with a: <input value={filterText} onChange={handleFilterChange} placeholder='filter...' />
        </div>
    )
}

export default Filter