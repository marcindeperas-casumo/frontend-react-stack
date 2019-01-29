import { ENTITY_KEYS } from "Models/schema";
import { listTypes } from "Models/gameSearch";

export const gameSearchEntities = ({
  loading = false,
  noMatch = false,
  hasNoLatestPlayed = false,
  games,
  query,
}) => ({
  [ENTITY_KEYS.GAME_LIST]: {
    id: listTypes.GAME_SEARCH_ID,
    games,
    query,
    loading,
    noMatch,
    hasNoLatestPlayed,
  },
});
