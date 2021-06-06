import React, { useState } from 'react'

const LoginForm = ({ loginHandler }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const eventHandler = async (event) => {
        event.preventDefault()
        const credentials = {
            username,
            password
        }

        loginHandler(credentials)
        setUsername('')
        setPassword('')
    }


    return (
        <>
            <h2>Login</h2>
            <form onSubmit={eventHandler}>
                <div>
                    <p>Username: <input required type='text' name='username' placeholder='username' value={username} onChange={({ target }) => setUsername(target.value)} /></p>
                    <p>Password: <input required type='password' name='password' placeholder='password' value={password} onChange={({ target }) => setPassword(target.value)} /></p>
                    <p><button type='submit'>Login</button></p>
                </div>
            </form>
        </>
    )
}

export default LoginForm