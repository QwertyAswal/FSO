import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Forms from './components/Forms'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')
    const [msgNotification, setMsgNotification] = useState(null)

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('loggedInUser')
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser))
            const initializeBlogs = async () => {
                setBlogs(await blogService.getAll())
            }
            initializeBlogs()
        }
    }, [])

    const loginHandler = async (event) => {
        event.preventDefault()
        const credentials = {
            username,
            password
        }
        const tempUser = await loginService.login(credentials)
        if (tempUser) {
            window.localStorage.setItem('loggedInUser', JSON.stringify(tempUser))
            setUser(tempUser)
            setBlogs(await blogService.getAll())
        }
        setUsername('')
        setPassword('')
    }

    const logoutHandler = (event) => {
        window.localStorage.removeItem('loggedInUser')
        setUser(null)
        setBlogs([])
    }

    const createBlogHandler = async (event) => {
        event.preventDefault()
        const blog = {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        }
        const createdBlog = await blogService.createBlog(blog, setMsgNotification)
        setBlogs(blogs.concat(createdBlog))
        setBlogAuthor('')
        setBlogTitle('')
        setBlogUrl('')
    }

    return (
        <div>
            {msgNotification}
            {user === null ?
                <Forms.LoginForm loginHandler={loginHandler} username={username} setUsername={setUsername} password={password} setPassword={setPassword} /> :
                <>
                    <Blog user={user} blogs={blogs} logoutHandler={logoutHandler} />
                    <Forms.BlogForm blogAuthor={blogAuthor} setBlogAuthor={setBlogAuthor} blogTitle={blogTitle} setBlogTitle={setBlogTitle} blogUrl={blogUrl} setBlogUrl={setBlogUrl} createBlogHandler={createBlogHandler} />
                </>
            }
        </div >
    )
}

export default App