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
        <div classname="formDiv">
            <h2>Create a new note</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        data-testid="noteContent"
                        value={newNote}
                        onChange={(event) => setNewNote(event.target.value)}
                        id="note-input"
                        placeholder="write note content here"
                    />
                    <input type="text" value={"test"} onChange={"test"} />
                </div>

                <div>
                    <button type="submit">save note</button>
                </div>
            </form>
        </div>
    );
};

export default NoteForm;
