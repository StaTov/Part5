import {useState} from "react";

const Blog = ({blog, user}) => {
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
                            <button type="button">like</button>
                        </div>
                        <div>{user.name}</div>
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