import React, { useState } from "react";
import "./App.css";

// when TypeScript can't infer the type, we need to provide the type explicitly
interface Note {
    id: number;
    content: string;
}

const App = () => {
    const [newNote, setNewNote] = useState("");
    const [notes, setNotes] = useState<Note[]>([
        { id: 1, content: "this is a test note" },
    ]);

    // TODO: get notes from the json-server
    // ...

    // from React TypeScript Cheatsheet - right type of event handler is React.SyntheticEvent
    const noteCreation = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const addNote: Note = {
            id: notes.length + 1,
            content: newNote,
        };

        setNotes(notes.concat(addNote));
        setNewNote("");
    };

    return (
        <>
            <div>
                <form onSubmit={noteCreation}>
                    <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <button type="submit">Add new note</button>
                </form>
            </div>
            <div>
                <ul>
                    {notes &&
                        notes.map((note) => (
                            <li key={note.id}>{note.content}</li>
                        ))}
                </ul>
            </div>
        </>
    );
};

export default App;
