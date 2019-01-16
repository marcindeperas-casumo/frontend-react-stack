// @flow
import store from "store";

export const get = (key: string, defaultValue: any) =>
  store.get.call(store, key) || defaultValue;

export const set = (key: string, value: any) =>
  store.set.call(store, key, value);

export const remove = (key: string) => store.remove.call(store, key);

export const clearAll = () => store.clearAll(store);

export default {
  get,
  set,
  remove,
  clearAll,
};
