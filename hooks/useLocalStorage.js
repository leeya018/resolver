import { useState, useEffect } from "react";
// useLocalStorage -  can update the localStorage key to be something
//  but it will be overwritten from the localStorage instance
// we can also setItem(key, value) in the localStorage if we use that method
export default function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
