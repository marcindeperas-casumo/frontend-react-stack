import { createSelector } from "reselect";
export const getFetch = name =>
  createSelector(
    state => (state as any).fetch || {},
    fetchState => fetchState[name] || null
  );
export const isFetched = name =>
  createSelector(getFetch(name), fetch => {
    if (!fetch) {
      return false;
    }
    if (fetch.error) {
      return false;
    }
    if (fetch.isFetching) {
      return false;
    }
    return true;
  });
export const isFetchingStarted = name =>
  createSelector(getFetch(name), fetch => {
    if (!fetch) {
      return false;
    }
    if (fetch.error) {
      return false;
    }
    return true;
  });
export const isNotFetchedSelector = name =>
  createSelector(getFetch(name), fetch => {
    if (!fetch) {
      return true;
    }
    return false;
  });
export const isFetchError = name =>
  createSelector(getFetch(name), fetch => {
    if (fetch && fetch.error) {
      return fetch.error;
    }
    return false;
  });
