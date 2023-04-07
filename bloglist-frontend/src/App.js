import React, {useState, useEffect, useRef} from 'react'
import './style.css'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm";
import BlogsContent from "./components/BlogsContent";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import loginService from "./services/logins";


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({text: null, style: false})
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs([...blogs].sort((a, b) => {
                    return (b.likes - a.likes)
                }
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
    const setAuthorization = async (signObj) => {
        try {
            const user = await loginService.login(signObj)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            showNote('login successful', true)

        } catch (error) {
            showNote('wrong username or password', false)
            console.error(error.message)
        }
    }
    const showNote = (text, success) => {
        setMessage({text: `${text}`, style: success})
        setTimeout(() => setMessage({text: null, style: false}), 3000)
    }
    const handleClickLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }
    const addBlog = async (blogObj) => {
        try {
            blogFormRef.current.toggleVisibility()

            const response = await blogService.create(blogObj)
            const newBlog = await blogService.getOne(response.id)
            setBlogs([...blogs, newBlog])
            showNote(`a new blog ${response.title} by ${response.author} added`, true)
        } catch (error) {
            showNote('Title and url are required', false)
            console.log(error.message)
        }
    }
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
            showNote('Blog was removed', true)
        } catch (error) {
            showNote('Unsuccessfully', false)
            console.error(error.message)
        }
    }
    return (
        <div>
            {user === null
                ? <LoginForm
                    setAuthorization={setAuthorization}
                >
                    <Notification message={message}/>
                </LoginForm>
                : <div>
                    <Togglable
                        buttonLable="New blog"
                        ref={blogFormRef}>
                        <BlogForm addBlog={addBlog}/>
                    </Togglable>
                    <BlogsContent
                        setBlogs={setBlogs}
                        blogs={blogs}
                        user={user}
                        message={message}
                        handleClickLogout={handleClickLogout}
                        handleLikeAdd={handleLikeAdd}
                        handleDeleteBlog={handleDeleteBlog}
                    >
                        <Notification message={message}/>
                    </BlogsContent>
                </div>}
        </div>
    )
}

export default App