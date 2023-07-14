import { useState } from "react";

export const useField = (name: string) => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event ? setValue(event.target.value) : setValue("");
  };

  return {
    name,
    value,
    onChange,
  };
};
