/* @flow */
import { isNil } from "ramda";

export default class PersistedData {
  key: string;
  defaultValue: any;

  constructor(key: string, defaultValue: any) {
    /* eslint-disable fp/no-mutation */
    this.key = key;
    this.defaultValue = defaultValue;
    /* eslint-enable fp/no-mutation */
  }

  get() {
    try {
      // $FlowIgnore: getItem can return null which *is* handled by JSON.parse
      const persistedData = JSON.parse(localStorage.getItem(this.key));

      return isNil(persistedData) ? this.defaultValue : persistedData;
    } catch (err) {
      //TODO: log this properly
      return this.defaultValue;
    }
  }

  set(newValue: any) {
    localStorage.setItem(this.key, JSON.stringify(newValue));
  }
}
