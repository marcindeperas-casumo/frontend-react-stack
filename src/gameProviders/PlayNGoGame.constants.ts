// @flow
export const EVENTS = {
  ON_GAME_ROUND_START: { type: "roundStarted" },
  ON_GAME_ROUND_END: { type: "gameIdle" },
};
export const COMMANDS = {
  PAUSE: { req: "gameDisable" },
  RESUME: { req: "gameEnable" },
  END_GAME: { req: "gameEnd" },
};
