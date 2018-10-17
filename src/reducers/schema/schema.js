import { schema, normalize } from "normalizr";

export const JACKPOT_ENTITY_KEY = "jackpot";
export const LIVE_TABLE_ENTITY_KEY = "liveTable";
export const GAME_ENTITY_KEY = "game";
export const GAME_LIST_ENTITY_KEY = "gameList";

export const jackpot = new schema.Entity(
  JACKPOT_ENTITY_KEY,
  {},
  { idAttribute: "jackpotId" }
);

export const liveTable = new schema.Entity(
  LIVE_TABLE_ENTITY_KEY,
  {},
  { idAttribute: "tableId" }
);

export const game = new schema.Entity(
  GAME_ENTITY_KEY,
  { lobby: liveTable },
  { idAttribute: "slug" }
);

export const gameList = new schema.Entity(GAME_LIST_ENTITY_KEY, {
  games: [game],
});

export const applicationSchema = {
  // Question: Not sure defining the keys like this is good DX. If you're
  // seeing this and think it should be done differently, create a PR with your
  // suggestion.
  [GAME_ENTITY_KEY]: game,
  [`${GAME_ENTITY_KEY}s`]: [game],
  [GAME_LIST_ENTITY_KEY]: gameList,
  [`${GAME_LIST_ENTITY_KEY}s`]: [gameList],
  [LIVE_TABLE_ENTITY_KEY]: liveTable,
  [`${LIVE_TABLE_ENTITY_KEY}s`]: [liveTable],
  [JACKPOT_ENTITY_KEY]: jackpot,
  [`${JACKPOT_ENTITY_KEY}s`]: [jackpot],
};

export const normalizeData = data => normalize(data, applicationSchema);

export default applicationSchema;
