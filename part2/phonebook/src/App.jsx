import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "024 9696", id: 1 },
        { name: "Dan John", number: "123 1111", id: 2 },
        { name: "Mark Xavier", number: "321 4444", id: 3 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterName, setFilterName] = useState("");

    const filteredPersonsByName = persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPersonObj = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };

        // verificam daca newName exista deja in person
        const personExists = persons.some(
            (person) => person.name === newPersonObj.name
        );

        if (personExists) {
            alert(`${newName} already exists in phonebook`);
        }

        if (personExists === false) {
            setPersons(persons.concat(newPersonObj));
        }
        setNewName("");
        setNewNumber("");
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterName(e.target.value);
    };

    return (
        <>
            <h2>Phonebook</h2>
            <Filter value={filterName} handleChange={handleFilterChange} />

            <h2>Add new</h2>
            <PersonForm
                handleSubmit={handleSubmit}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                nameValue={newName}
                numberValue={newNumber}
            />

            <div>
                <h2>Numbers</h2>
                <Persons persons={filteredPersonsByName} />
            </div>
        </>
    );
};

export default App;
