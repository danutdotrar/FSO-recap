import { useState, useEffect, useRef, useContext } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { NotificationContext } from "./context/notificationContext";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

const App = () => {
    // const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [url, setUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const blogFormRef = useRef();

    const [state, dispatchState] = useContext(NotificationContext);

    const { title, author } = state;

    // access the queryClient
    const queryClient = useQueryClient();

    // get the blogs
    const {
        data: blogs,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["blogs"],
        queryFn: blogService.getAll,
        // the request is executed only if user exists
        enabled: !!user,
    });

    // define mutation for posting blogs
    const newBlogMutation = useMutation({
        mutationFn: blogService.createBlog,
        onSuccess: (newBlog) => {
            // invalidate queries
            queryClient.invalidateQueries("blogs");

            // notification
            setErrorMessage(
                `new blog '${newBlog.title} by ${newBlog.author}' added`
            );
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);

            // reset fields
            dispatchState({ type: "CLEAR_FIELDS" });
            setUrl("");
        },
        // handle errors
        onError: (error) => {
            // error message
            setErrorMessage(`${error.response?.data?.error || error.message}`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        },
    });

    // define login mutation
    const loginMutation = useMutation({
        mutationFn: loginService.login,
        // react query will execute 'onSuccess' after the promise from mutationFn is resolved
        // 'user' will be the response received by loginService.login fn
        onSuccess: (user) => {
            window.localStorage.setItem("blogUser", JSON.stringify(user));

            console.log(user);
            setUser(user);

            setUsername("");
            setPassword("");
        },
        onError: (error) => {
            setErrorMessage("username or password not ok");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        },
    });

    useEffect(() => {
        const userFromLocalStorage = window.localStorage.getItem("blogUser");

        // if user exists in local storage, save it in the 'user' state
        if (userFromLocalStorage) {
            // convert string to object with JSON parse
            const user = JSON.parse(userFromLocalStorage);
            setUser(user);
        }
    }, []);

    // query the data from server
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    // the token is set only after user is logged in
                    blogService.setToken(user.token);
                } catch (error) {
                    setUser(null);
                }
            };
            fetchData();
        }
    }, [user]);

    // useEffect(() => {
    //     if (data) {
    //         setBlogs(data);
    //     }

    //     if (error) {
    //         setUser(null);
    //     }
    // }, [data, error, setUser]);

    const handleLogin = async (event) => {
        event.preventDefault();

        // facem un POST request pentru login cu username si parola
        // try {
        //     // save the user from the backend request (token, username, name)
        //     const user = await loginService.login({ username, password });

        //     // save the user to local storage
        //     window.localStorage.setItem("blogUser", JSON.stringify(user));

        //     // save the user to state
        //     setUser(user);

        //     setUsername("");
        //     setPassword("");
        // } catch (error) {
        //     setErrorMessage("username or password not ok");
        //     setTimeout(() => {
        //         setErrorMessage(null);
        //     }, 5000);
        // }

        loginMutation.mutate({ username, password });
    };

    const handleLogOut = () => {
        // clear local storage
        window.localStorage.clear();
        // set user to null to logout
        setUser(null);
    };

    const handleBlogSubmit = async (event) => {
        event.preventDefault();

        blogFormRef.current.toggleVisibility();

        const newObj = { title, author, url };

        // set the token to headers Authorization
        blogService.setToken(user.token);

        // add the user that created this request
        // make a POST request to '/api/blogs'
        // const addNewBlog = await blogService.createBlog(newObj);

        newBlogMutation.mutate(newObj);

        // reset fields
        dispatchState({ type: "CLEAR_FIELDS" });
        // setTitle("");
        // setAuthor("");
        setUrl("");
    };

    // use mutation to update blogs
    const updateBlogMutation = useMutation({
        mutationFn: ({ id, updatedData }) =>
            blogService.updateBlog(id, updatedData),

        onSuccess: (updatedBlog) => {
            console.log(updatedBlog);
            queryClient.setQueryData(["blogs"], (oldData) => {
                if (!oldData) {
                    return oldData;
                } else {
                    return [
                        ...oldData.map((blog) =>
                            blog.id === updatedBlog?.id ? updatedBlog : blog
                        ),
                    ];
                }
            });
        },
        onError: (error) => {
            console.log(error);
        },
    });

    // PUT request
    const handleBlogUpdate = async (blog) => {
        if (blog) {
            const blogId = blog?.id;

            const updatedBlogObj = {
                ...blog,
                likes: +blog.likes + 1,
            };

            updateBlogMutation.mutate({
                id: blogId,
                updatedData: updatedBlogObj,
            });
        }

        // // HTTP PUT request to the backend
        // const response = await blogService.updateBlog(blogId, updatedBlogObj);

        // // take the updated object and update frontend
        // const updatedBlogs = blogs.map((blog) =>
        //     blog.id !== blogId ? blog : updatedBlogObj
        // );

        // setBlogs(updatedBlogs);
    };

    const handleBlogRemove = async (blogId) => {
        // HTTP DELETE request with the blog id
        // update backend and frontend

        // set the bearer token for request config
        blogService.setToken(user.token);

        const currentBlog = blogs.find((blog) => blog.id === blogId);

        if (window.confirm(`Remove '${currentBlog.title}'?`)) {
            const response = await blogService.deleteBlog(blogId);

            // update frontend
            // remove the blog with the blogId from the blog Array
            const filteredBlogs = blogs.filter((blog) => blog.id !== blogId);

            setBlogs(filteredBlogs);
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
                        data-testid="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password:{" "}
                    <input
                        type="text"
                        data-testid="password"
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

            <h2>blogs list</h2>
            {blogs
                ?.sort((a, b) => +a.likes - +b.likes)
                ?.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        updateBlog={handleBlogUpdate}
                        removeBlog={handleBlogRemove}
                    />
                ))}
        </>
    );

    return <div>{user === null ? loginForm() : renderData()}</div>;
};

export default App;
