import {useState} from "react";
import blogServices from '../services/blogs'

const Blog = ({blog, blogs, user, setBlogs}) => {
    const [visible, setVisible] = useState(false)
    const handleVisibility = () => {
        setVisible(!visible)
    }
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const handleDelete = async () => {
        if (!window.confirm(`Remove blog ${blog.title} gonna need it! by ${user.name}`)) {
            return
        }

        try {
            await blogServices.remove(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        } catch (error) {
            console.error(error.message)
        }

    }
    const handleLike = async () => {
        const newObj = {
            title: blog.title,
            url: blog.url,
            user: user.id,
            likes: blog.likes + 1
        }
        try {
            const response = await blogServices.update(blog.id, newObj)
            setBlogs([...blogs].map(b =>
                (b.id === response.id ? response : b)
            ))
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button
                    type="button"
                    onClick={handleVisibility}>
                    {visible ? 'hide' : 'view'}
                </button>
            </div>
            <div>
                {visible
                    ? <div>
                        <div>URL: {blog.url}</div>
                        <div>likes: {blog.likes}
                            <button
                                type="button"
                                onClick={handleLike}
                            >like
                            </button>
                        </div>
                        <div>{user.name}</div>
                        <div>{blog.user[0].username === user.username &&
                            <button
                                type="submit"
                                onClick={handleDelete}>
                                remove
                            </button>}
                        </div>
                    </div>
                    : <div>
                        {null}
                    </div>
                }
            </div>
        </div>
    )
}

export default Blog