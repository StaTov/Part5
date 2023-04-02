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
            setBlogs(blogs)
        )
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
                        blogs={blogs}
                        user={user}
                        setUser={setUser}
                        message={message}
                    />
                </div>}
        </div>
    )
}

export default App