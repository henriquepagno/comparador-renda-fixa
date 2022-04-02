import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export default function usePersistedState<T>(
  defaultValue: T,
  localStorageKey: string
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const localStorageItem =
      typeof window !== 'undefined'
        ? localStorage.getItem(localStorageKey)
        : null;

    if (localStorageItem === null) {
      setValue(defaultValue);
      return;
    }

    try {
      setValue(JSON.parse(localStorageItem));
    } catch (err) {
      setValue(defaultValue);
    }
  }, [defaultValue, localStorageKey]);

  useEffect(() => {
    typeof window !== 'undefined'
      ? localStorage.setItem(localStorageKey, JSON.stringify(value))
      : null;
  }, [value, localStorageKey]);

  return [value, setValue];
}
