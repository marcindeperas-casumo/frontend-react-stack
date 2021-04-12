import { defaultDataIdFromObject } from "@apollo/client/cache";

export const dataIdFromObject = obj => {
  return defaultDataIdFromObject(obj);
};
