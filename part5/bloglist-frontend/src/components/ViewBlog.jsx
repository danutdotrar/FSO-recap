import React, { useEffect, useState } from "react";
import blogsService from "../services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ViewBlog = ({ updateBlog, blogs }) => {
    const [comment, setComment] = useState("");

    const queryClient = useQueryClient();

    const params = useParams();
    const id = params.id;

    const addBlogMutation = useMutation({
        mutationFn: async ({ blogId, blogComment }) => {
            const updatedBlog = await blogsService.addComment(
                blogId,
                blogComment
            );
            // return the updated blog
            return updatedBlog;
        },
        onSuccess: (updatedBlog) => {
            queryClient.setQueryData(["blogs"], (oldData) => {
                if (!oldData) {
                    return oldData;
                } else {
                    return [
                        ...oldData.map((blog) =>
                            blog.id == updatedBlog.id ? updatedBlog : blog
                        ),
                    ];
                }
            });
            queryClient.invalidateQueries("blogs");
        },
    });

    const handleAddComment = async (event) => {
        event.preventDefault();

        const blogComment = { comment };

        addBlogMutation.mutate({ blogId: id, blogComment });

        // reset field
        setComment("");
    };

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
            <h2>comments</h2>
            <div>
                <div>
                    <form onSubmit={handleAddComment}>
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button type="submit">add comment</button>
                    </form>
                </div>
                <ul>
                    {blogData.comments.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewBlog;
