import React from "react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ALL_PERSONS, CREATE_PERSON } from "../queries/queries.js";

const PersonForm = ({ showError }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");

    // useMutation with the GraphQL query 'CREATE_PERSON'
    // refetch the all_persons query after the mutation is done
    // pass as many queries as needed for refetch
    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries: [{ query: ALL_PERSONS }],
        onError: (error) => {
            const message = error.graphQLErrors
                .map((e) => e.message)
                .join("\n");
            showError(message);
        },
    });

    const submit = (event) => {
        event.preventDefault();

        createPerson({ variables: { name, phone, street, city } });

        setName("");
        setPhone("");
        setStreet("");
        setCity("");
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
                <div>
                    name{" "}
                    <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    phone{" "}
                    <input
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </div>
                <div>
                    street{" "}
                    <input
                        value={street}
                        onChange={({ target }) => setStreet(target.value)}
                    />
                </div>
                <div>
                    city{" "}
                    <input
                        value={city}
                        onChange={({ target }) => setCity(target.value)}
                    />
                </div>
                <button type="submit">add!</button>
            </form>
        </div>
    );
};

export default PersonForm;
