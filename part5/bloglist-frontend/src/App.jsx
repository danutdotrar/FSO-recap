import { useState, useEffect, useRef, useContext } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import blogService from "./services/blogs";
import loginService from "./services/login";
import usersService from "./services/users";
import { NotificationContext } from "./context/notificationContext";
import { UserContext } from "./context/userContext";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import Header from "./components/Header";
import ViewUsers from "./components/ViewUsers";
import UserBlogs from "./components/UserBlogs";
import ViewBlog from "./components/ViewBlog";

const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [url, setUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const [state, dispatchState] = useContext(NotificationContext);
    const { title, author } = state;

    const [user, dispatchUser] = useContext(UserContext);

    const navigate = useNavigate();
    const blogFormRef = useRef();

    // if user exists in local storage, save that user
    useEffect(() => {
        const userFromLocalStorage = window.localStorage.getItem("blogUser");

        // if user exists in local storage, save it in the 'user' state
        if (userFromLocalStorage) {
            // convert string to object with JSON parse
            const user = JSON.parse(userFromLocalStorage);

            dispatchUser({ type: "SET_USER", payload: user });
        }
    }, []);

    // set the token after user logged in
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    // the token is set only after user is logged in
                    blogService.setToken(user.token);
                    usersService.setToken(user.token);

                    setIsUserLoaded(true);
                } catch (error) {
                    dispatchUser({ type: "CLEAR_USER" });
                    setIsUserLoaded(false);
                }
            };
            fetchData();
        }
    }, [user]);

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
        enabled: !!user && isUserLoaded,
        retry: false,
    });

    // get the users
    const { data: users } = useQuery({
        queryKey: ["users"],
        queryFn: usersService.getAllUsers,
        enabled: !!user && isUserLoaded,
        retry: false,
    });

    // console.log("users from useQuery: ", users);

    // if error is 401 then redirect to /login
    useEffect(() => {
        if (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage(`Session expired. Please login again`);

                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);

                handleLogOut();
            }
        }
    }, [error]);

    // define login mutation
    const loginMutation = useMutation({
        mutationFn: loginService.login,
        // react query will execute 'onSuccess' after the promise from mutationFn is resolved
        // 'user' will be the response received by loginService.login fn
        onSuccess: (user) => {
            window.localStorage.setItem("blogUser", JSON.stringify(user));

            dispatchUser({ type: "SET_USER", payload: user });

            navigate("/users");

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

    // define mutation for posting blogs
    const newBlogMutation = useMutation({
        // react query will execute the onSuccess function after the promise from the mutationFn is resolved
        mutationFn: blogService.createBlog,
        // 'newBlog' will be the response returned from mutationFn
        onSuccess: (newBlog) => {
            // invalidate queries
            queryClient.setQueryData(["blogs"], (oldData) => {
                if (!oldData) {
                    return oldData;
                }

                if (oldData) {
                    return [...oldData.concat(newBlog)];
                }
            });
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

    // use mutation to update blogs
    const updateBlogMutation = useMutation({
        mutationFn: ({ id, updatedData }) =>
            blogService.updateBlog(id, updatedData),

        onSuccess: (updatedBlog) => {
            // force data refresh
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
        onError: () => {},
    });

    const removeBlogMutation = useMutation({
        mutationFn: async ({ id }) => {
            await blogService.deleteBlog(id);
            // return the id from the request
            return id;
        },
        // blogId will be the 'id' returned from mutationFn
        onSuccess: (blogId) => {
            queryClient.setQueryData(["blogs"], (oldData) => {
                if (!oldData) {
                    return oldData;
                } else {
                    return [...oldData.filter((blog) => blog.id !== blogId)];
                }
            });
        },
        onError: () => {},
    });

    const handleLogin = async (event) => {
        event.preventDefault();

        loginMutation.mutate({ username, password });
    };

    const handleLogOut = () => {
        // clear local storage
        window.localStorage.clear();

        // set user to null to logout
        dispatchUser({ type: "CLEAR_USER" });

        // navigate("/login");
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
        setUrl("");
    };

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
    };

    const handleBlogRemove = async (blogId) => {
        // HTTP DELETE request with the blog id
        // update backend and frontend

        // set the bearer token for request config
        blogService.setToken(user.token);

        const currentBlog = blogs.find((blog) => blog.id === blogId);

        if (window.confirm(`Remove '${currentBlog.title}'?`)) {
            removeBlogMutation.mutate({ id: blogId });
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (user === null) {
        return loginForm();
    }

    // TODO: add 'create new blogs' button to /blogs page
    return (
        <div>
            <Header
                errorMessage={errorMessage}
                user={user}
                handleLogOut={handleLogOut}
            />
            <Routes>
                <Route path="/users" element={<ViewUsers users={users} />} />
                <Route
                    path="/users/:id"
                    element={
                        <UserBlogs
                            handleBlogSubmit={handleBlogSubmit}
                            title={title}
                            author={author}
                            url={url}
                            setUrl={setUrl}
                            blogFormRef={blogFormRef}
                        />
                    }
                />
                <Route
                    path="/blogs/:id"
                    element={
                        <ViewBlog blogs={blogs} updateBlog={handleBlogUpdate} />
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
