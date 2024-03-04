import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);

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
        const note = notes.find((note) => note.id === id);

        const changedNote = { ...note, important: !note.important };
        try {
            const responseData = await noteService.update(id, changedNote);

            setNotes(
                notes.map((note) => (note.id !== id ? note : responseData))
            );
        } catch (eror) {
            alert(`the note '${note.content}' was already deleted from server`);
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

    return (
        <div>
            <h1>Notes</h1>
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
