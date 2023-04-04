import React from 'react';
import Blog from "./Blog";


const BlogsContent = ({
                          children,
                          blogs,
                          user,
                          handleDeleteBlog,
                          handleLikeAdd,
                          handleClickLogout
                      }) => {
    return (
        <div>
            <h2>blogs</h2>
            {children}
            <div>
                {user.name} logged in
                <button
                    onClick={handleClickLogout}
                    type="button">logout</button>
            </div>
            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    handleLikeAdd={handleLikeAdd}
                    handleDeleteBlog={handleDeleteBlog}
                />
            )}
        </div>
    );
};

export default BlogsContent;