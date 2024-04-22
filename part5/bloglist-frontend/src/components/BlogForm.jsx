import React from "react";
import { useState } from "react";

const BlogForm = ({
    handleBlogSubmit,
    title,
    handleTitle,
    author,
    handleAuthor,
    url,
    handleUrl,
}) => {
    const [visibility, setVisibility] = useState(false);

    const showWhenVisible = { display: visibility ? "" : "none" };
    const hideWhenVisible = { display: visibility ? "none" : "" };

    const handleVisibility = () => {
        // toggle visibility
        setVisibility(!visibility);
    };

    return (
        <div>
            <button style={hideWhenVisible} onClick={handleVisibility}>
                new blog
            </button>

            <div style={showWhenVisible}>
                <form onSubmit={handleBlogSubmit}>
                    <h2>create new blog</h2>
                    <div>
                        title{" "}
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitle}
                        />
                    </div>
                    <div>
                        author{" "}
                        <input
                            type="text"
                            value={author}
                            onChange={handleAuthor}
                        />
                    </div>
                    <div>
                        url{" "}
                        <input type="text" value={url} onChange={handleUrl} />
                    </div>
                    <button type="submit">create blog</button>
                </form>
            </div>
            <button style={showWhenVisible} onClick={handleVisibility}>
                cancel
            </button>
        </div>
    );
};

export default BlogForm;
