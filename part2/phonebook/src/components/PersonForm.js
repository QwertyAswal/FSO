import React from 'react'

const PersonForm = ({ addPerson, newName, handleNameChange, handleNumberChange, newNumber }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} placeholder='a new name...' />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} placeholder='a new number...' />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm