import React from "react";

const Persons = ({ persons, removeContact }) => {
    return (
        <div>
            {persons.map((person) => (
                <li key={person.id}>
                    {person.name} - {person.number}
                    <button onClick={() => removeContact(person.id)}>
                        delete
                    </button>
                </li>
            ))}
        </div>
    );
};

export default Persons;
