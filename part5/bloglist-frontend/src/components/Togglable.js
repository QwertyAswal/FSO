import React, { useImperativeHandle, useState } from 'react'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={hideWhenVisible}>
                <p><button onClick={toggleVisibility}>{props.toggleLabel}</button></p>
            </div>
            <div style={showWhenVisible}>
                <p><button onClick={toggleVisibility}>{props.cancelLabel}</button></p>
                {props.children}
            </div>
        </>
    )
})

export default Togglable