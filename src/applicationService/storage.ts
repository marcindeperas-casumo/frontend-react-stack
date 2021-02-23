import * as storage from "Lib/storage";

export const NAMESPACE = "react-stack";

export const get = (key: string, defaultValue?: any) =>
  storage.get(key, defaultValue, NAMESPACE);

export const set = (key: string, value: any) =>
  storage.set(key, value, NAMESPACE);

export const remove = (key: string) => storage.remove(key, NAMESPACE);
