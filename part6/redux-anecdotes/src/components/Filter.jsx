import React from "react";
import { useDispatch } from "react-redux";
import { filterByInput } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(filterByInput(event.target.value));
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <strong>
                filter <input type="text" onChange={handleChange} />
            </strong>
        </div>
    );
};

export default Filter;
