export const EVENTS = {
  ON_GAME_ROUND_START: { type: "roundStarted" },
  ON_GAME_ROUND_END: { type: "gameIdle" },
  ON_BACK_TO_LOBBY: { type: "backToLobby" },
};
export const COMMANDS = {
  PAUSE: { req: "gameDisable" },
  RESUME: { req: "gameEnable" },
  END_GAME: { req: "gameEnd" },
};
