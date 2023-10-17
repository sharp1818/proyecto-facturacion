import { useState } from "react";

const useInput = (initialValue : any) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event : any) => {
        setValue(event.target.value);
    };

    const setNewValue = (newValue: any) => {
        setValue(newValue)
    }
    return {
        value,
        onChange: handleChange,
        setNewValue,
    };
};

export default useInput;