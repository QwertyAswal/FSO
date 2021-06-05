import React from 'react'
const Blog = ({ blogs, user, logoutHandler }) => {
    return (
        <>
            <div>
                <h2>Blogs</h2>
                <div>
                    <p>{user.name} logged in!<br /><button onClick={logoutHandler}>Logout</button></p>
                </div>
                {blogs.map(blog => <div key={blog.id}>{blog.title} {blog.author}</div>)}
            </div>
        </>
    )
}

export default Blog