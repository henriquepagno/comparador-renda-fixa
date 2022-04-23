const existsLocalStorage = (localStorageKey: string): boolean => {
  const localStorageItem =
    typeof window !== 'undefined'
      ? localStorage.getItem(localStorageKey)
      : null;

  if (localStorageItem === null) return false;

  return true;
};

export default existsLocalStorage;
