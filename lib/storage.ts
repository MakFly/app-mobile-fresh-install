import { createMMKV, type MMKV } from 'react-native-mmkv';

export const storage: MMKV = createMMKV({ id: 'iautos-app' });

/** Type-safe sync getter */
export function getItem<T>(key: string): T | null {
  const raw = storage.getString(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return raw as unknown as T;
  }
}

/** Type-safe sync setter */
export function setItem<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value));
}

/** Remove a key */
export function removeItem(key: string): void {
  storage.remove(key);
}
