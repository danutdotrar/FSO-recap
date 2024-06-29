import { useState } from "react";

// Custom hooks
export const useField = (name) => {
    const [value, setValue] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const reset = () => {
        setValue("");
    };

    // keep only the props needed for <input/>
    const inputProps = { name, value, onChange };

    return { inputProps, reset };
};
