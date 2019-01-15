import store from "store";

export const get = key => store.get.call(store, key);

export const set = (key, value) => store.set.call(store, key, value);

export const remove = key => store.remove.call(store, key);

export const clearAll = () => store.clearAll(store);

export default {
  get,
  set,
  remove,
  clearAll,
};
