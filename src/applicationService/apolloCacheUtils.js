import { defaultDataIdFromObject } from "apollo-cache-inmemory";

export const dataIdFromObject = obj => {
  return defaultDataIdFromObject(obj);
};
