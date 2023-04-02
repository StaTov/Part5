import React from 'react';
import Blog from "./Blog";
import Notification from "./Notification";

const BlogsContent = ({blogs, user, setUser, message}) => {
  const handleClick = () => {
        window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={message}/>
            <div>
                {user.name} logged in
                <button
                    onClick={handleClick}
                    type="button">logout</button>
            </div>
            {blogs.map(blog =>
                <Blog key={blog.id}
                      blog={blog}
                      user={user}
                />
            )}
        </div>
    );
};

export default BlogsContent;