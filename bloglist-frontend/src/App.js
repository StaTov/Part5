import {useState, useEffect} from 'react'
import './style.css'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm";
import BlogsContent from "./components/BlogsContent";
import CreateBlog from "./components/CreateBlog";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

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
            setUser(user)
        }
    }, [])

    return (
        <div>
            {user === null
                ? <LoginForm
                    password={password}
                    setPassword={setPassword}
                    username={username}
                    setUsername={setUsername}
                    setUser={setUser}
                                   />
                : <div>
                    <CreateBlog
                        blogs={blogs}
                        setBlogs={setBlogs}
                        title={title}
                        author={author}
                        url={url}
                        setTitle={setTitle}
                        setAuthor={setAuthor}
                        setUrl={setUrl}
                    />
                    <BlogsContent
                        blogs={blogs}
                        user={user}
                        setUser={setUser}
                    />
                </div>}
        </div>
    )
}

export default App