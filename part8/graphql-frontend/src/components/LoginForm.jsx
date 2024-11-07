import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";
import { useEffect } from "react";

const LoginForm = ({ setToken, showError }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // define the login mutation
    const [login, result] = useMutation(LOGIN, {
        variables: { username, password },
        onError: (error) => {
            const message = error.graphQLErrors
                .map((e) => e.message)
                .join("\n");
            showError(message);
        },
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;

            // set token in App and in local stoarge
            setToken(token);
            localStorage.setItem("phonenumbers-user-token", token);
        }
    }, [result.data]);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // login

        // use GraphQL login mutation with the credentials
        login({ variables: { username, password } });

        // reset fields
        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
