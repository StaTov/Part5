import React from 'react';
import Blog from "./Blog";

const BlogsContent = ({blogs, user, setUser}) => {
  const handleClick = () => {
        window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }

    return (
        <div>
            <h2>blogs</h2>
            <div>
                {user.name} logged in
                <button
                    onClick={handleClick}
                    type="button">logout</button>
            </div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </div>
    );
};

export default BlogsContent;