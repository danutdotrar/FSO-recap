import React from "react";

const NoteForm = ({ handleSubmit, value, handleInputChange }) => {
    return (
        <>
            <h2>Create a new note</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={value}
                        onChange={handleInputChange}
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
