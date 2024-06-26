import { useState } from "react";

// Custom hooks
export const useField = (name) => {
    const [value, setValue] = useState("");

    // set the value
    const onChange = (e) => {
        setValue(e.target.value);
    };

    return { name, value, onChange };
};
