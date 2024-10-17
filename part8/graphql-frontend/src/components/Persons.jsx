import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

// query for find person
const FIND_PERSON = gql`
    query findPersonByName($nameToSearch: String!) {
        findPerson(name: $nameToSearch) {
            name
            phone
            id
            address {
                street
                city
            }
        }
    }
`;

const Person = ({ person, onClose }) => {
    return (
        <div>
            <h2>{person.name}</h2>
            <div>
                {person.address.street} {person.address.city}
            </div>
            <div>{person.phone}</div>
            <button onClick={onClose}>close</button>
        </div>
    );
};

const Persons = ({ persons }) => {
    const [nameToSearch, setNameToSearch] = useState(null);

    // if there is no nameToSearch, skip useQuery
    const result = useQuery(FIND_PERSON, {
        variables: { nameToSearch },
        skip: !nameToSearch,
    });

    // if nameToSearch exists, return single person details
    if (nameToSearch && result.data) {
        return (
            <Person
                person={result.data.findPerson}
                onClose={() => setNameToSearch(null)}
            />
        );
    }

    return (
        <>
            <h2>Persons</h2>
            {persons.map((p) => (
                <div key={p.name}>
                    {p.name} {p.phone}
                    <button onClick={() => setNameToSearch(p.name)}>
                        show address
                    </button>
                </div>
            ))}
        </>
    );
};

export default Persons;
