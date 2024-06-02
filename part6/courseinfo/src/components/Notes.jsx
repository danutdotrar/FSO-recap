import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";

const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong>{note.important ? " important" : ""}</strong>
        </li>
    );
};

const Notes = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => {
        if (state.filter === "ALL") {
            return state.notes;
        }

        return state.filter === "IMPORTANT"
            ? state.notes.filter((note) => note.important === true)
            : state.notes.filter((note) => note.important === false);
    });

    const handleUpdate = async (id, note) => {
        const updatedNote = { ...note, important: !note.important };
        const response = await noteService.updateNote(id, updatedNote);

        dispatch(toggleImportanceOf(response));
    };

    return (
        <ul>
            {notes.map((note) => (
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => handleUpdate(note.id, note)}
                />
            ))}
        </ul>
    );
};

export default Notes;
