import { useCallback, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (err) {
      console.error(`Não foi possível buscar o valor no localStorage: ${err}`);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (err) {
        throw new Error(
          `Não foi possível salvar o valor no localStorage: ${err}`
        );
      }
    },
    [storedValue, key]
  );

  return [storedValue, setValue] as const;
}
