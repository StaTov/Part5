import {useState} from "react";


const Blog = ({blog, user, handleDeleteBlog, handleLikeAdd}) => {
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

    return (
        <div className="blog" style={blogStyle}>
            <div className="firstInfo">
                {blog.title} {blog.author}
                <button
                    type="button"
                    onClick={handleVisibility}>
                    {visible ? 'hide' : 'view'}
                </button>
            </div>
            <div className="secondInfo">
                {visible
                    ? <div>
                        <div>URL: {blog.url}</div>
                        <div>likes: {blog.likes}
                            <button
                                type="button"
                                onClick={() => handleLikeAdd(blog)}
                            >like
                            </button>
                        </div>
                        <div>{user.name}</div>
                        <div>{blog.user[0].username === user.username &&
                            <button
                                type="submit"
                                onClick={() => handleDeleteBlog(blog, user)}>
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