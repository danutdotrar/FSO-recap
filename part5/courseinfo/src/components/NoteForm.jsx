import React from "react";
import { useState } from "react";

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        createNote({ content: newNote, important: true });

        setNewNote("");
    };

    return (
        <>
            <h2>Create a new note</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={newNote}
                        onChange={(event) => setNewNote(event.target.value)}
                    />
                </div>

                <div>
                    <button type="submit">save note</button>
                </div>
            </form>
        </>
    );
};

export default NoteForm;
