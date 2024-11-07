import { useState } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import "./App.css";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { ALL_PERSONS } from "./queries/queries.js";
import { Notify } from "./components/Notify";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

function App() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(null);
    const result = useQuery(ALL_PERSONS);
    const client = useApolloClient();

    // useQuery will execute the query it receives as parameter
    if (result.loading) {
        return <div>Loading...</div>;
    }

    // show error message
    const showError = (error) => {
        setErrorMessage(error);
        setTimeout(() => {
            setErrorMessage(null);
        }, 7000);
    };

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    if (!token) {
        return (
            <>
                <h1>Login</h1>
                <Notify error={errorMessage} />
                <LoginForm setToken={setToken} showError={showError} />
            </>
        );
    }

    // TODO next: part 8d - adding a token to a header
    return (
        <>
            <Notify error={errorMessage} />
            <button onClick={logout}>logout</button>
            <Persons persons={result.data.allPersons} />
            <PersonForm showError={showError} />
            <PhoneForm showError={showError} />
        </>
    );
}

export default App;
