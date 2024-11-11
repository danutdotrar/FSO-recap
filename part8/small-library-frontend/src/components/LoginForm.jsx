import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // login mutation
    // take the login function and the 'result' from the useMutation
    const [login, result] = useMutation(LOGIN, {
        variables: {
            username,
            password,
        },
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;

            // set the token in the App state
            setToken(token);
            // set the token in the localStorage, to attach it to headers with createHttpLink
            localStorage.setItem("library-user-token", token);

            navigate("/books");
        }
    }, [result.data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        login({ variables: { username, password } });

        // reset fields
        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;
