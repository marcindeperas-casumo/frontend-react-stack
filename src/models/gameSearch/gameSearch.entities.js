import { ENTITY_KEYS } from "Models/schema";

export const gameSearchEntities = ({
  loading = false,
  noMatch = false,
  games,
}) => ({
  [ENTITY_KEYS.GAME_LIST]: {
    id: "gameSearch",
    loading,
    noMatch,
    games,
  },
});
