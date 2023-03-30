import blogService from '../services/blogs'

const CreateBlog = ({
                        title,
                        author,
                        url,
                        setAuthor,
                        setTitle,
                        setUrl,
                        setBlogs,
                        blogs
                    }) => {
    const handleCreateBlog = async (e) => {
        e.preventDefault()

        const newObj = {title, author, url}
        const response = await blogService.create(newObj)
        setBlogs([...blogs, response])
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

export default CreateBlog;