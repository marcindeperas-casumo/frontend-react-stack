import { schema, normalize } from "normalizr";
import { ENTITY_KEYS } from "./schema.constants";

export const jackpot = new schema.Entity(
  ENTITY_KEYS.JACKPOT,
  {},
  { idAttribute: "gameId" }
);

export const liveTable = new schema.Entity(
  ENTITY_KEYS.LIVE_TABLE,
  {},
  { idAttribute: "tableId" }
);

export const game = new schema.Entity(
  ENTITY_KEYS.GAME,
  { lobby: liveTable },
  { idAttribute: "slug" }
);

export const gameList = new schema.Entity(ENTITY_KEYS.GAME_LIST, {
  games: [game],
});

export const cms = new schema.Entity(
  ENTITY_KEYS.CMS,
  {},
  { idAttribute: "slug" }
);

export const jackpotMustDrop = new schema.Entity(
  ENTITY_KEYS.JACKPOT_MUST_DROP,
  {},
  { idAttribute: "id" }
);

export const applicationSchema = {
  // Question: Not sure defining the keys like this is good DX. If you're
  // seeing this and think it should be done differently, create a PR with your
  // suggestion.
  [ENTITY_KEYS.GAME]: game,
  [`${ENTITY_KEYS.GAME}s`]: [game],
  [ENTITY_KEYS.GAME_LIST]: gameList,
  [`${ENTITY_KEYS.GAME_LIST}s`]: [gameList],
  [ENTITY_KEYS.LIVE_TABLE]: liveTable,
  [`${ENTITY_KEYS.LIVE_TABLE}s`]: [liveTable],
  [ENTITY_KEYS.JACKPOT]: jackpot,
  [`${ENTITY_KEYS.JACKPOT}s`]: [jackpot],
  [ENTITY_KEYS.GAME.JACKPOT_MUST_DROP]: [jackpotMustDrop],
  [ENTITY_KEYS.CMS]: cms,
  [`${ENTITY_KEYS.CMS}s`]: [cms],
};

export const normalizeData = data => normalize(data, applicationSchema);

export default applicationSchema;
