import { useState } from "react";

// Custom hooks
export const useField = (name) => {
    const [value, setValue] = useState("");

    // set the value
    const onChange = (e) => {
        setValue(e.target.value);
    };

    // reset the value to ""
    const reset = () => {
        setValue("");
    };

    // keep only the props needed for <input/>
    const inputProps = { name, value, onChange };

    return { inputProps, reset };
};
