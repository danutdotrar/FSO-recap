import React from "react";

const Note = ({ note, toggleImportance, deleteNote }) => {
    const label = note.important ? "make not important" : "make important";

    return (
        <div>
            <li>
                {note.content}{" "}
                <button onClick={toggleImportance}>{label}</button>
                <span> --- </span>
                <button onClick={deleteNote}>delete</button>
            </li>
        </div>
    );
};

export default Note;
