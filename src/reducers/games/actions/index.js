export const types = {
  FETCH_TOP_LISTS: "GAMES/FETCH_TOP_LISTS",
  NORMALISE_TOP_LISTS: "GAMES/NORMALISE_TOP_LISTS",
  UPDATE_ENTITIES: "GAMES/UPDATE_ENTITIES",
};

export const fetchTopLists = () => ({ type: types.FETCH_TOP_LISTS });
export const normaliseTopLists = response => ({
  type: types.NORMALISE_TOP_LISTS,
  response,
});
export const updateEntities = entities => ({
  type: types.UPDATE_ENTITIES,
  entities,
});
