import React from "react";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { EDIT_NUMBER } from "../queries/queries";

const PhoneForm = ({ showError }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // define mutation
    const [changeNumber, result] = useMutation(EDIT_NUMBER);

    const submit = (e) => {
        e.preventDefault();

        // execute mutation with the variables from the state
        changeNumber({ variables: { name, phone } });

        // reset fields
        setName("");
        setPhone("");
    };

    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            showError("Person not found");
        }
    }, [result.data]);

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Person name:{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    Change phone:{" "}
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button type="submit">Change phone</button>
            </form>
        </div>
    );
};

export default PhoneForm;
