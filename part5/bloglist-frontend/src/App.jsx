import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const blogFormRef = useRef();

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    blogService.setToken(user.token);

                    const blogs = await blogService.getAll();
                    setBlogs(blogs);
                } catch (error) {
                    setUser(null);
                }
            };
            fetchData();
        }
    }, [user]);

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
            setErrorMessage("username or password not ok");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const handleLogOut = () => {
        // clear local storage
        window.localStorage.clear();
        // set user to null to logout
        setUser(null);
    };

    const handleBlogSubmit = async (event) => {
        event.preventDefault();

        // hide the form after submitted
        // call toggleVisibility from BlogForm
        // use useRef to access that function inside BlogForm component
        // blogFormRef.current.toggleVisibility()

        const newObj = { title, author, url };

        try {
            // set the token to headers Authorization
            blogService.setToken(user.token);

            // add the user that created this request
            // make a POST request to '/api/blogs'
            const addNewBlog = await blogService.createBlog(newObj);

            // update frontend
            const updatedBlogs = blogs.concat(addNewBlog);
            setBlogs(updatedBlogs);

            // reset fields
            setTitle("");
            setAuthor("");
            setUrl("");

            // add an alert for 5 seconds with the details of the posted blog
            setErrorMessage(`new blog '${title} by ${author}' added`);

            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        } catch (error) {
            //
        }
    };

    const loginForm = () => (
        <>
            <h2>Log in to app</h2>
            {errorMessage && (
                <>
                    <div
                        style={{
                            borderRadius: "5px",
                            backgroundColor: "lightpink",
                            padding: "6px",
                        }}
                    >
                        <h2>{errorMessage}</h2>
                    </div>
                </>
            )}
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

    const renderData = () => (
        <>
            {errorMessage && (
                <>
                    <div
                        style={{
                            borderRadius: "5px",
                            backgroundColor: "lightgreen",
                            padding: "6px",
                        }}
                    >
                        <h2>{errorMessage}</h2>
                    </div>
                </>
            )}

            <h2>blogs</h2>
            <div>
                <p>
                    {user.name} is Logged In{" "}
                    <button onClick={handleLogOut}>Logout</button>
                </p>
            </div>
            <Togglable buttonLabel="new blog">
                <BlogForm
                    handleBlogSubmit={handleBlogSubmit}
                    title={title}
                    author={author}
                    url={url}
                    handleTitle={(event) => setTitle(event.target.value)}
                    handleAuthor={(event) => setAuthor(event.target.value)}
                    handleUrl={(event) => setUrl(event.target.value)}
                />
            </Togglable>

            <h2>blogs list</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </>
    );

    return <div>{user === null ? loginForm() : renderData()}</div>;
};

export default App;
