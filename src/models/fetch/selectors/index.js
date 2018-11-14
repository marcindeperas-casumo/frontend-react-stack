import { createSelector } from "reselect";

export const fetchSelector = state => state.fetch;

export const fetchStatusFactory = name =>
  createSelector(
    fetchSelector,
    fetchState => fetchState[name] || { isFetching: false, error: null }
  );
