export type DebouncedFunction<TArgs extends unknown[]> = {
  (...args: TArgs): void;
  cancel: () => void;
};

export function debounce<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number
): DebouncedFunction<TArgs> {
  let timeoutId: number | null = null;

  function debouncedCallback(...args: TArgs) {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delayMs);
  }

  debouncedCallback.cancel = () => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debouncedCallback;
}
