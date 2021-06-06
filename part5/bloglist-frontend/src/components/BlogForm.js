import React, { useState } from 'react'

const BlogForm = ({ createBlogHandler }) => {

    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const createHandler = (event) => {
        event.preventDefault()
        const blog = {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        }
        createBlogHandler(blog)
        setBlogAuthor('')
        setBlogTitle('')
        setBlogUrl('')
    }

    return (
        <>
            <h2>New Blog</h2>
            <form onSubmit={createHandler}>
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

export default BlogForm