import { createEffect, createState, reconcile, unwrap } from "solid-js";

export function useLocalStorage<T extends Record<string, any>>(
  key: string,
  defaultValue: T
) {
  const [state, setState] = createState<T>(defaultValue);

  try {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) localStorage.setItem(key, JSON.stringify(defaultValue));
    else setState(reconcile(JSON.parse(rawValue)));
  } catch (e) {
    console.warn(e);
  }

  createEffect(() => localStorage.setItem(key, JSON.stringify(state)));

  return [state, setState] as const;
}
