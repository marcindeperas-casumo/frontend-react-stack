import { get as getFromStorage, set as setInStorage } from "Lib/storage";

export class PersistedData {
  key: string;
  defaultValue: any;

  constructor(key: string, defaultValue: any) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  get() {
    return getFromStorage(this.key, this.defaultValue);
  }

  set(newValue: any) {
    setInStorage(this.key, newValue);
  }
}
