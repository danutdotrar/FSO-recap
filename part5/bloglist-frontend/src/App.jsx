import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import axios from "axios";

import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // store the token containing the token, username and name in a 'user' state

    // show blogs only if logged in
    // use the token to find the user

    // login
    // facem un HTTP request pentru login (POST)
    // request-ul trebuie sa contina username si parola pentru a trimite catre backend
    // backend-ul verifica username si parola
    // daca user este gasit si parola corespunde, creeaza un token (jwt sign (detalii user, secret, expire time))
    // in token se ataseaza username, id care pot fi folosite daca se decodeaza token-ul cu jwt.verify
    // backend trimite ca raspuns token-ul (codul) si username si name

    // login form pentru login POST request

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        // facem un POST request pentru login cu username si parola
        try {
            await loginService.login({ username, password });
        } catch (error) {
            alert("username or password not ok");
        }
    };

    return (
        <div>
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

            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
