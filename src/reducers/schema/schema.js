import { schema } from "normalizr";

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
  [GAME_ENTITY_KEY]: game,
  [`${GAME_ENTITY_KEY}s`]: [game],
  [GAME_LIST_ENTITY_KEY]: gameList,
  [`${GAME_LIST_ENTITY_KEY}s`]: [gameList],
  [LIVE_TABLE_ENTITY_KEY]: liveTable,
  [`${LIVE_TABLE_ENTITY_KEY}s`]: [liveTable],
  [JACKPOT_ENTITY_KEY]: jackpot,
  [`${JACKPOT_ENTITY_KEY}s`]: [jackpot],
};

export default applicationSchema;
