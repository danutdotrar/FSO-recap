import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newNameObj = {
            name: newName,
        };

        // verificam daca newName exista deja in person
        const personExists = persons.some(
            (person) => person.name === newNameObj.name
        );

        if (personExists) {
            alert(`${newName} already exists in phonebook`);
        }

        if (personExists === false) {
            setPersons(persons.concat(newNameObj));
        }
        setNewName("");
    };

    const handleInputChange = (e) => {
        setNewName(e.target.value);
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
                        onChange={handleInputChange}
                        name="name"
                        placeholder="Enter name..."
                    />
                </div>

                <button onSubmit={handleSubmit}>Save</button>
            </form>

            <div>
                <h3>Numbers</h3>
                {persons.map((person) => (
                    <li>{person.name}</li>
                ))}
            </div>
        </>
    );
};

export default App;
