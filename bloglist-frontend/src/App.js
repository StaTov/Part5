import {useState, useEffect, useRef} from 'react'
import './style.css'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm";
import BlogsContent from "./components/BlogsContent";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs([...blogs].sort((a, b) => {return (b.likes - a.likes)}
        )))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window
            .localStorage
            .getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            setUser(user)
        }
    }, [])

    const handleLikeAdd = async (blog) => {
        const newObj = {
            title: blog.title,
            url: blog.url,
            user: user.id,
            likes: blog.likes + 1
        }
        try {
            const response = await blogService.update(blog.id, newObj)
            const newBlog = await blogService.getOne(response.id)
            setBlogs([...blogs].map(b =>
                (b.id === response.id ? newBlog : b)
            ))
        } catch (error) {
            console.error(error.message)
        }
    }
    const handleDeleteBlog = async (blog, user) => {
        if (!window.confirm(`Remove blog ${blog.title} gonna need it! by ${user.name}`)) {
            return
        }

        try {
            await blogService.remove(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        } catch (error) {
            console.error(error.message)
        }

    }
    return (
        <div>
            {user === null
                ? <LoginForm
                    setUser={setUser}
                    message={message}
                    setMessage={setMessage}
                />
                : <div>
                    <Togglable
                        buttonLable="New blog"
                        ref={blogFormRef}>
                        <BlogForm
                            blogFormRef={blogFormRef}
                            blogs={blogs}
                            setBlogs={setBlogs}
                            message={message}
                            setMessage={setMessage}
                        />
                    </Togglable>
                    <BlogsContent
                        setBlogs={setBlogs}
                        blogs={blogs}
                        user={user}
                        setUser={setUser}
                        message={message}
                        handleLikeAdd={handleLikeAdd}
                        handleDeleteBlog={handleDeleteBlog}
                    />
                </div>}
        </div>
    )
}

export default App