class LocalStorageService {
  private storage: Storage | undefined;

  constructor() {
    if (typeof window !== "undefined") {
      this.storage = window.localStorage;
    } else {
      console.warn("Local storage is not available in this environment.");
    }
  }

  getItem(key: string): string | null {
    if (this.storage) {
      const data = this.storage.getItem(key) || '';
      try {
        const objectData = JSON.parse(data);
        return objectData;
      } catch (error) {
        return data;
      }
    }
    return null;
  }

  setItem(key: string, value: any): void {
    if (this.storage) {
      try {
        const serializedValue = typeof value === 'object' ? JSON.stringify(value) : value;
        this.storage.setItem(key, serializedValue);
      } catch (error) {
        throw new Error("Value is wrong json format");
      }
    }
  }

  getToken(): string | null {
    return this.getItem("token");
  }

  setToken(value: any): void {
    this.setItem("token", value);
  }

  clearToken(): void {
    this.removeItem("token");
  }

  getUser(): string | null {
    return this.getItem("user");
  }

  setUser(value: any): void {
    this.setItem("user", value);
  }

  removeItem(key: string): void {
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }

  clear(): void {
    if (this.storage) {
      this.storage.clear();
    }
  }
}

export default LocalStorageService;
