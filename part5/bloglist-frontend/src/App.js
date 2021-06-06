import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [msgNotification, setMsgNotification] = useState(null)

    const createBlogRef = useRef()

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

    const loginHandler = async (credentials) => {
        const tempUser = await loginService.login(credentials)
        if (tempUser) {
            window.localStorage.setItem('loggedInUser', JSON.stringify(tempUser))
            setUser(tempUser)
            setBlogs(await blogService.getAll())
        }
    }

    const logoutHandler = (event) => {
        window.localStorage.removeItem('loggedInUser')
        setUser(null)
        setBlogs([])
    }

    const createBlogHandler = async (blog) => {
        createBlogRef.current.toggleVisibility()
        const createdBlog = await blogService.createBlog(blog, setMsgNotification)
        setBlogs(blogs.concat(createdBlog))
    }

    return (
        <div>
            {msgNotification}
            {user === null ?
                <LoginForm loginHandler={loginHandler} /> :
                <>
                    <Blog user={user} blogs={blogs} logoutHandler={logoutHandler} />
                    <Togglable cancelLabel='Hide Form' toggleLabel='Create New Blog' ref={createBlogRef}>
                        <BlogForm createBlogHandler={createBlogHandler} />
                    </Togglable>
                </>
            }
        </div >
    )
}

export default App