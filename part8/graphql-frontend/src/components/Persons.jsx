import React from "react";

const Persons = ({ persons }) => {
    return (
        <>
            <h2>Persons</h2>
            {persons.map((person) => (
                <div>{person.name}</div>
            ))}
        </>
    );
};

export default Persons;
