import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import usersService from "../services/users";

const UserBlogs = () => {
    const params = useParams();
    const id = params.id;

    const [userBlogs, setUserBlogs] = useState([]);

    useEffect(() => {
        const getUserBlogs = async () => {
            const userData = await usersService.getSingleUser(id);

            setUserBlogs(userData.blogs);
        };
        getUserBlogs();
    }, [id]);

    if (!userBlogs) return <p>Loading...</p>;

    return (
        <div>
            <h2>added blogs</h2>
            <>
                <ul>
                    {userBlogs.map((blog) => (
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
