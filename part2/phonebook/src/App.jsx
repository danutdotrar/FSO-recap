import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterName, setFilterName] = useState("");

    useEffect(() => {
        // async function to connect to api
        const fetchData = async () => {
            // get response data
            const response = await personService.getAll();
            // set persons state to response data
            setPersons(response.data);
        };

        fetchData();
    }, []);

    const filteredPersonsByName = persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPersonObj = {
            name: newName,
            number: newNumber,
            id: (persons.length + 1).toString(),
        };

        // verificam daca newName exista deja in person
        const personExists = persons.some(
            (person) => person.name === newPersonObj.name
        );

        if (personExists) {
            const shouldUpdate = window.confirm(
                `${newName} already added in phonebook, replace old number with the new one?`
            );

            if (shouldUpdate) {
                console.log(personExists);
                // find the person
                const personToUpdate = persons.find(
                    (person) => person.name === newPersonObj.name
                );

                // update backend
                const updatedObj = { ...personToUpdate, number: newNumber };
                const response = await personService.update(
                    personToUpdate.id,
                    updatedObj
                );

                // update frontend with map
                setPersons(
                    persons.map((person) =>
                        person.id !== personToUpdate.id ? person : response.data
                    )
                );
            }
        }

        if (personExists === false) {
            try {
                // adaugam in backend cu personService.create()
                const response = await personService.create(newPersonObj);
                // adaugam in app state obiectul cu persoana noua
                setPersons(persons.concat(response.data));
            } catch (error) {
                console.log("Error creating person: ", error);
            }
        }

        // reset state input fields
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

    const removeContact = async (id) => {
        // delete from backend and frontend

        try {
            // find the person in state
            const findPersonById = persons.find((person) => person.id === id);

            const shouldDelete = window.confirm(
                `Delete ${findPersonById.name}?`
            );

            if (shouldDelete) {
                // delete request in backend for person
                const response = await personService.remove(findPersonById.id);

                // update the frontend
                setPersons(persons.filter((person) => person.id !== id));
            }
        } catch (error) {
            console.log("Error deleting: ", error);
        }
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
                <Persons
                    persons={filteredPersonsByName}
                    removeContact={removeContact}
                />
            </div>
        </>
    );
};

export default App;
