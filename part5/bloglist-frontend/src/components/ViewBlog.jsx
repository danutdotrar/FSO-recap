import React, { useEffect, useState } from "react";
import blogsService from "../services/blogs";
import { useParams } from "react-router-dom";

const ViewBlog = ({ updateBlog, blogs }) => {
    const params = useParams();
    const id = params.id;

    // get the blogs from the react query state
    // find the blog with the same 'id' as the params
    const blogData = blogs?.find((blog) => blog.id === id);

    if (!blogData)
        return <div>Only the owner of the blog can see its details...</div>;

    return (
        <div>
            <h2>{blogData.title}</h2>
            <div className="url">{blogData.url}</div>
            <div className="likes">
                <div className="nr-likes">
                    {blogData.likes}
                    <button
                        className="button"
                        onClick={() => updateBlog(blogData)}
                    >
                        like
                    </button>
                </div>
            </div>
            <div className="author">{blogData.author}</div>
        </div>
    );
};

export default ViewBlog;
