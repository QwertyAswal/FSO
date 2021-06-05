import React from 'react'

const LoginForm = ({ loginHandler, username, setUsername, password, setPassword }) => {
    return (
        <>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <div>
                    <p>Username: <input required type='text' name='username' placeholder='username' value={username} onChange={({ target }) => setUsername(target.value)} /></p>
                    <p>Password: <input required type='password' name='password' placeholder='password' value={password} onChange={({ target }) => setPassword(target.value)} /></p>
                    <p><button type='submit'>Login</button></p>
                </div>
            </form>
        </>
    )
}

const BlogForm = ({ blogTitle, setBlogTitle, blogAuthor, setBlogAuthor, blogUrl, setBlogUrl, createBlogHandler }) => {
    return (
        <>
            <h2>New Blog</h2>
            <form onSubmit={createBlogHandler}>
                <div>
                    <p>Title: <input required type='text' name='title' placeholder='title' value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)} /></p>
                    <p>Author: <input required type='text' name='author' placeholder='author' value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)} /></p>
                    <p>URL: <input required type='text' name='url' placeholder='url' value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)} /></p>
                    <p><button type='submit'>Create</button></p>
                </div>
            </form>
        </>
    )
}

const Forms = {
    LoginForm,
    BlogForm
}

export default Forms