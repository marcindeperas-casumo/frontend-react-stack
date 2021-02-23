import store from "store";

const getStoreInstance = (namespace?: string) =>
  namespace ? store.namespace(namespace) : store;

const callStore = (namespace?: string) => (
  method: string,
  ...args: any[]
) => {
  const storeInstance = getStoreInstance(namespace);

  return storeInstance[method].call(storeInstance, ...args);
};

export const get = (key: string, defaultValue?: any, namespace?: string) => {
  return callStore(namespace)("get", key) || defaultValue;
};

export const set = (key: string, value: any, namespace?: string) => {
  return callStore(namespace)("set", key, value);
};

export const remove = (key: string, namespace?: string) =>
  callStore(namespace)("remove", key);
