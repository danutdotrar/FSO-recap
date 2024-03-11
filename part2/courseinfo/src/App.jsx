import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";

const App = () => {
    const [notes, setNotes] = useState(null);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const responseData = await noteService.getAll();

            setNotes(responseData);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create new noteObject
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: (notes.length + 1).toString(),
        };

        const responseData = await noteService.create(noteObject);

        // Concat noteObject to notes state
        setNotes(notes.concat(responseData));

        // reset newNote value
        setNewNote("");
    };

    const handleInputChange = (e) => {
        setNewNote(e.target.value);
    };

    const toggleImportance = async (id) => {
        // find the note with the id of the clicked note
        const note = notes.find((note) => note.id === id);

        // make a copy of that note and change what we want to change
        const changedNote = { ...note, important: !note.important };

        try {
            // update backend with axios method
            const responseData = await noteService.update(id, changedNote);

            // update App state
            setNotes(
                notes.map((note) => (note.id !== id ? note : responseData))
            );
        } catch (eror) {
            setErrorMessage(
                `the note '${note.content}' was already deleted from server`
            );
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            setNotes(notes.filter((n) => n.id !== id));
        }
    };

    const deleteNote = async (id) => {
        // use remove request from services
        await noteService.remove(id);

        setNotes(notes.filter((note) => note.id !== id));
    };

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true);

    // do not render anything if notes are null
    if (!notes) return null;

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>

            <ul>
                {notesToShow.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportance(note.id)}
                        deleteNote={() => deleteNote(note.id)}
                    />
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={newNote}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <button type="submit">save note</button>
                </div>
            </form>
        </div>
    );
};

export default App;
