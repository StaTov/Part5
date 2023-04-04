import {useState} from "react";

const BlogForm = ({addBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleChangeTitle = ({target}) => {
        setTitle(target.value)
    }
    const handleChangeAuthor = ({target}) => {
        setAuthor(target.value)
    }
    const handleChangeUrl = ({target}) => {
        setUrl(target.value)
    }
    const handleCreateBlog = (e) => {
        e.preventDefault()
        addBlog({title, author, url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    title:
                    <input
                        value={title}
                        onChange={handleChangeTitle}
                        type="text"/>
                </div>
                <div>
                    author:
                    <input
                        value={author}
                        onChange={handleChangeAuthor}
                        type="text"/>
                </div>
                <div>
                    url:
                    <input
                        value={url}
                        onChange={handleChangeUrl}
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