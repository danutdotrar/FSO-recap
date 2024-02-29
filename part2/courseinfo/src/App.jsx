import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create new noteObject
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: notes.length + 1,
        };

        // Concat noteObject to notes state
        setNotes(notes.concat(noteObject));

        // reset newNote value
        setNewNote("");
    };

    const handleInputChange = (e) => {
        setNewNote(e.target.value);
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
                    <Note key={note.id} note={note} />
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
