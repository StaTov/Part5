import blogService from '../services/blogs'
import {useState} from "react";

const BlogForm = ({
                      blogFormRef,
                      setBlogs,
                      blogs,
                      setMessage
                  }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (e) => {
        e.preventDefault()
        try {
            blogFormRef.current.toggleVisibility()
            const newObj = {title, author, url}

            const response = await blogService.create(newObj)
            const newBlog = await blogService.getOne(response.id)

            setBlogs([...blogs, newBlog])

            setMessage(`a new blog ${response.title} by ${response.author} added`)
            setTimeout(() => setMessage(null), 3000)
        } catch (error) {

            setMessage(`title and url are required`)
            setTimeout(() => setMessage(null), 3000)
        } finally {

            setTitle('')
            setAuthor('')
            setUrl('')
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    title:
                    <input
                        value={title}
                        onChange={({target}) => {
                            setTitle(target.value)
                        }}
                        type="text"/>
                </div>
                <div>
                    author:
                    <input
                        value={author}
                        onChange={({target}) => {
                            setAuthor(target.value)
                        }}
                        type="text"/>
                </div>
                <div>
                    url:
                    <input
                        value={url}
                        onChange={({target}) => {
                            setUrl(target.value)
                        }}
                        type="text"/>
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;