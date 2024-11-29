import { useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import "./App.css";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { ALL_PERSONS, PERSON_ADDED } from "./queries/queries.js";
import { Notify } from "./components/Notify";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

// taking care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
    // helper, eliminate saving same person twice
    const uniqByName = (a) => {
        // define new set
        let seen = new Set();

        // filter the array
        return a.filter((item) => {
            // if the set has current item then skip it
            // if set has NOT current item then add it to the set
            // seen.add is truthy so it'll keep it in filtered arr
            return seen.has(item.name) ? false : seen.add(item.name);
        });
    };

    cache.updateQuery(query, ({ allPersons }) => {
        return {
            allPersons: uniqByName(allPersons.concat(addedPerson)),
        };
    });
};

// TODO next: n+1 problem and recap of part8
function App() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(null);
    const result = useQuery(ALL_PERSONS);
    const client = useApolloClient();

    useSubscription(PERSON_ADDED, {
        onData: ({ data, client }) => {
            const addedPerson = data.data.personAdded;

            updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);

            // client.cache.updateQuery(
            //     { query: ALL_PERSONS },
            //     ({ allPersons }) => {
            //         return {
            //             allPersons: allPersons.concat(addedPerson),
            //         };
            //     }
            // );
        },
    });

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
