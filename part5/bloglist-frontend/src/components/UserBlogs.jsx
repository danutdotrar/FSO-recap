import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import usersService from "../services/users";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { NotificationContext } from "../context/notificationContext";
import { useQuery } from "@tanstack/react-query";

const UserBlogs = ({
    handleBlogSubmit,
    title,
    author,
    url,
    setUrl,
    blogFormRef,
    userId,
}) => {
    const params = useParams();
    // const id = params.id;
    const id = userId ?? params.id;

    const [state, dispatchState] = useContext(NotificationContext);
    // const [userBlogs, setUserBlogs] = useState([]);

    // useEffect(() => {
    //     const getUserBlogs = async () => {
    //         const userData = await usersService.getSingleUser(id);

    //         setUserBlogs(userData.blogs);
    //     };
    //     getUserBlogs();
    // }, [id, handleBlogSubmit]);

    const { data: user, isLoading } = useQuery({
        queryKey: ["user", id],
        queryFn: () => usersService.getSingleUser(id),
    });

    // query is loading
    if (isLoading) return <p>Loading...</p>;

    // if (!userBlogs) return <p>Loading...</p>;

    return (
        <div>
            <h2>{user.name} - added blogs</h2>

            <Togglable ref={blogFormRef} buttonLabel="new blog">
                <BlogForm
                    handleBlogSubmit={handleBlogSubmit}
                    title={title}
                    author={author}
                    url={url}
                    handleTitle={(event) =>
                        dispatchState({
                            type: "SET_TITLE",
                            payload: event.target.value,
                        })
                    }
                    handleAuthor={(event) =>
                        dispatchState({
                            type: "SET_AUTHOR",
                            payload: event.target.value,
                        })
                    }
                    handleUrl={(event) => setUrl(event.target.value)}
                />
            </Togglable>
            <>
                <ul>
                    {user?.blogs.map((blog) => (
                        <Link to={`/blogs/${blog.id}`} key={blog.id}>
                            <li>{blog.title}</li>
                        </Link>
                    ))}
                </ul>
            </>
        </div>
    );
};

export default UserBlogs;
