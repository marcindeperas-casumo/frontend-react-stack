// @flow
import http from "Lib/http";

export const URL = {
  PLAYER_ACKNOWLEDGEMENTS_FIRST:
    "/casino-player/tac-versioning-public-api/api/v2/player-acks/first",
  PLAYER_ACKNOWLEDGEMENTS_LAST:
    "/casino-player/tac-versioning-public-api/api/v2/player-acks/",
};

export const getFirstTACApproval = () =>
  http.get(URL.PLAYER_ACKNOWLEDGEMENTS_FIRST);
export const getLastTACApproval = () =>
  http.get(URL.PLAYER_ACKNOWLEDGEMENTS_LAST);
