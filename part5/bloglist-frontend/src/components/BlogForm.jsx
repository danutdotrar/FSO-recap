import React from "react";
import PropTypes from "prop-types";

const BlogForm = ({
    handleBlogSubmit,
    title,
    handleTitle,
    author,
    handleAuthor,
    url,
    handleUrl,
}) => {
    return (
        <div>
            <form onSubmit={handleBlogSubmit}>
                <h2>create new blog</h2>
                <div>
                    title{" "}
                    <input
                        type="text"
                        data-testid="title"
                        value={title}
                        onChange={handleTitle}
                        placeholder="enter title here"
                    />
                </div>
                <div>
                    author{" "}
                    <input
                        type="text"
                        data-testid="author"
                        value={author}
                        onChange={handleAuthor}
                    />
                </div>
                <div>
                    url{" "}
                    <input
                        type="text"
                        data-testid="url"
                        value={url}
                        onChange={handleUrl}
                    />
                </div>
                <button type="submit">create blog</button>
            </form>
        </div>
    );
};

// BlogForm.propTypes = {
//     handleBlogSubmit: PropTypes.func.isRequired,
//     title: PropTypes.string.isRequired,
//     handleTitle: PropTypes.func.isRequired,
//     author: PropTypes.string.isRequired,
//     handleAuthor: PropTypes.func.isRequired,
//     url: PropTypes.string.isRequired,
//     handleUrl: PropTypes.func.isRequired,
// };

export default BlogForm;
