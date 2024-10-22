import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "./App.css";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { ALL_PERSONS } from "./queries/queries.js";

function App() {
    // useQuery will execute the query it receives as parameter
    const result = useQuery(ALL_PERSONS);

    if (result.loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Persons persons={result.data.allPersons} />
            <PersonForm />
        </>
    );
}

export default App;
