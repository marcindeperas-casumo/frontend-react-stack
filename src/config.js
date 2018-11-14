// TODO: Figure out where this file containing
// domain specific configuration should live.
import { GAME_LIST_IDS } from "./constants";

export default {
  // Set which game-lists should show maintenance games as well.
  gameListsShowingMaintenanceGames: [GAME_LIST_IDS.LATEST_PLAYED_GAMES],
};
