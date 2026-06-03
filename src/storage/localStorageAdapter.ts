export function readJsonFromLocalStorage<T>(key: string, fallbackValue: T): T {
  const storedValue = window.localStorage.getItem(key);

  if (!storedValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return fallbackValue;
  }
}

export function writeJsonToLocalStorage<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
