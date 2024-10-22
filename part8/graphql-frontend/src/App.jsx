import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "./App.css";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { ALL_PERSONS } from "./queries/queries.js";
import { Notify } from "./components/Notify";
import PhoneForm from "./components/PhoneForm";

function App() {
    const [errorMessage, setErrorMessage] = useState(null);

    // useQuery will execute the query it receives as parameter
    const result = useQuery(ALL_PERSONS);

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

    return (
        <>
            <Notify error={errorMessage} />
            <Persons persons={result.data.allPersons} />
            <PersonForm showError={showError} />
            <PhoneForm showError={showError} />
        </>
    );
}

export default App;
