import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "420 6969" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

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

    return (
        <>
            <h2>Persons</h2>

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
                <h3>Numbers</h3>
                {persons.map((person) => (
                    <li>
                        {person.name} - {person.number}
                    </li>
                ))}
            </div>
        </>
    );
};

export default App;
