import { useState } from "react";

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
            <div>
                filter shown with{" "}
                <input value={filterName} onChange={handleFilterChange} />
            </div>

            <h2>Add new</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        value={newName}
                        onChange={handleNameChange}
                        name="name"
                        placeholder="Enter name..."
                    />
                </div>
                <div className="form-container">
                    <label htmlFor="number">Number: </label>
                    <input
                        type="text"
                        value={newNumber}
                        onChange={handleNumberChange}
                        name="number"
                        placeholder="Enter number..."
                    />
                </div>

                <button onSubmit={handleSubmit}>Save</button>
            </form>

            <div>
                <h2>Numbers</h2>
                {filteredPersonsByName.map((person) => (
                    <li key={person.id}>
                        {person.name} - {person.number}
                    </li>
                ))}
            </div>
        </>
    );
};

export default App;
