// @flow
// TODO: Figure out where this file containing
// domain specific configuration should live.
import { GAME_LIST_IDS } from "./constants";

export default {
  // Set which game-lists should show maintenance games as well.
  gameListsShowingMaintenanceGames: [GAME_LIST_IDS.LATEST_PLAYED_GAMES],

  // Place key paths which you would like to sanitize from the Redux state
  // when sending to Rollbar with an error log
  // NOTE! This is not perfect yet, as it will remove the entire player object,
  // while it would be nice to only mask the certain player fields we want to exclude.
  sanitizedStateKeys: ["handshake.app.common/composition/players.players"],
  mixpanelToken: "ec4c2a09353dbe7faf59a46a4ddab0cb",
  mixpanelProjectName: "react-stack",
  graphqlUrl: "/graphql/casumo/",
};
