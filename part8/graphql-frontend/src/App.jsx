import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "./App.css";
import Persons from "./components/Persons";

// define the query
const ALL_PERSONS = gql`
    query {
        allPersons {
            name
            phone
            id
        }
    }
`;

function App() {
    // useQuery will execute the query it receives as parameter
    const result = useQuery(ALL_PERSONS);

    if (result.loading) {
        return <div>Loading...</div>;
    }

    return <Persons persons={result.data.allPersons} />;
}

export default App;
