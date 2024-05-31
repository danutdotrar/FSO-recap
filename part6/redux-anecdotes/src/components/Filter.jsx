import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setFilter(event.target.value));
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
