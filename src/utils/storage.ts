/**
 * Safe localStorage wrapper that gracefully handles private browsing mode,
 * disabled storage, quota exceeded errors, and corrupted JSON.
 */

class SafeStorage {
  private memoryFallback: Map<string, string> = new Map();

  private isStorageAvailable(): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  getItem(key: string): string | null {
    try {
      if (this.isStorageAvailable()) {
        return window.localStorage.getItem(key);
      }
      return this.memoryFallback.get(key) ?? null;
    } catch {
      return this.memoryFallback.get(key) ?? null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      if (this.isStorageAvailable()) {
        window.localStorage.setItem(key, value);
      } else {
        this.memoryFallback.set(key, value);
      }
    } catch {
      this.memoryFallback.set(key, value);
    }
  }

  removeItem(key: string): void {
    try {
      if (this.isStorageAvailable()) {
        window.localStorage.removeItem(key);
      }
      this.memoryFallback.delete(key);
    } catch {
      this.memoryFallback.delete(key);
    }
  }

  getJSON<T>(key: string, defaultValue: T): T {
    const raw = this.getItem(key);
    if (!raw) return defaultValue;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return defaultValue;
    }
  }

  setJSON<T>(key: string, value: T): void {
    try {
      this.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  }
}

export const safeStorage = new SafeStorage();
