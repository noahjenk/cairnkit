export function readJsonFromLocalStorage<T>(key: string, fallbackValue: T): T {
  let storedValue: string | null = null;

  try {
    storedValue = window.localStorage.getItem(key);
  } catch {
    return fallbackValue;
  }

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
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures so UI flows do not crash in restricted browser modes.
  }
}
