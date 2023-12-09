import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
  const [state, setState] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const value = window.localStorage.getItem(key);
        return value;
      }
      return initialValue;

    } catch (error) {
      console.log(error);
    }
  });

  const setValue = (value: string) : void => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
        setState(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};