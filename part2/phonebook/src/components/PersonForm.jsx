import React from "react";

const PersonForm = ({
    handleSubmit,
    handleNameChange,
    handleNumberChange,
    nameValue,
    numberValue,
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        value={nameValue}
                        onChange={handleNameChange}
                        name="name"
                        placeholder="Enter name..."
                    />
                </div>
                <div className="form-container">
                    <label htmlFor="number">Number: </label>
                    <input
                        type="text"
                        value={numberValue}
                        onChange={handleNumberChange}
                        name="number"
                        placeholder="Enter number..."
                    />
                </div>

                <button onSubmit={handleSubmit}>Save</button>
            </form>
        </div>
    );
};

export default PersonForm;
