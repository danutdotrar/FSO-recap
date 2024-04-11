import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import axios from "axios";

import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const userFromLocalStorage = window.localStorage.getItem("blogUser");

        // if user exists in local storage, save it in the 'user' state
        if (userFromLocalStorage) {
            // convert string to object with JSON parse
            const user = JSON.parse(userFromLocalStorage);
            setUser(user);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        // facem un POST request pentru login cu username si parola
        try {
            // save the user from the backend request (token, username, name)
            const user = await loginService.login({ username, password });

            // save the user to local storage
            window.localStorage.setItem("blogUser", JSON.stringify(user));

            // save the user to state
            setUser(user);

            setUsername("");
            setPassword("");
        } catch (error) {
            alert("username or password not ok");
        }
    };

    const loginForm = () => (
        <>
            <h2>Log in to app</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username:{" "}
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password:{" "}
                    <input
                        type="text"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </>
    );

    const handleLogOut = () => {
        // clear local storage
        window.localStorage.clear();
        // set user to null to logout
        setUser(null);
    };

    const handleBlogSubmit = (event) => {
        event.preventDefault();

        console.log(title, author, url);
        // add the user that created this request
        // make a POST request to '/api/blogs'
        // add likes?
    };

    const createBlogForm = () => (
        <div>
            <form onSubmit={handleBlogSubmit}>
                <h2>create new blog</h2>
                <div>
                    title{" "}
                    <input
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author{" "}
                    <input
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url{" "}
                    <input
                        type="text"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create blog</button>
            </form>
        </div>
    );

    const renderData = () => (
        <>
            <h2>blogs</h2>
            <div>
                <p>
                    {user.name} is Logged In{" "}
                    <button onClick={handleLogOut}>Logout</button>
                </p>
            </div>

            {createBlogForm()}

            <h2>blogs list</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </>
    );

    return <div>{user === null ? loginForm() : renderData()}</div>;
};

export default App;
