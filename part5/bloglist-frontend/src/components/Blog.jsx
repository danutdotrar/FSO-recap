import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
    const [visibility, setVisibility] = useState(false);

    const blogStyle = {
        border: "1px solid black",
        borderRadius: "5px",
        margin: "5px",
        padding: "5px",
    };

    const handleClick = () => {
        setVisibility(!visibility);
    };

    const showWhenVisible = { display: visibility ? "" : "none" };
    const hideWhenvisible = { display: visibility ? "none" : "" };

    return (
        <div style={blogStyle}>
            {blog.title}{" "}
            <button style={hideWhenvisible} onClick={handleClick}>
                view
            </button>
            <button style={showWhenVisible} onClick={handleClick}>
                hide
            </button>
            <div style={showWhenVisible}>
                <div>url: {blog.url}</div>
                <div>
                    likes: {blog.likes}{" "}
                    <button onClick={() => updateBlog(blog)}>like</button>
                </div>
                <div>author: {blog.author}</div>
            </div>
        </div>
    );
};

export default Blog;
