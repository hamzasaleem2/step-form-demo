import { useState, useEffect } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error("Error loading from LS:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const serializedValue = JSON.stringify(storedValue);
        window.localStorage.setItem(key, serializedValue);
      }
    } catch (error) {
      console.error("Error saving to LS:", error);
    }
  }, [key, storedValue]);

  const removeStoredValue = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error removing from LS:", error);
    }
  };

  return [storedValue, setStoredValue, removeStoredValue];
};

export default useLocalStorage;
