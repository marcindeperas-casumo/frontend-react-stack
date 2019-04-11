// @flow
import http from "Lib/http";
import type { TournamentsResponseRaw } from "Models/reelRaces";

export const URL = {
  REEL_RACES: "/api/common/query/tournament/tournamentCampaignView",
  REEL_RACE_OPT_IN: "/api/common/command/enterTournament",
};

export const getReelRacesReq = ({
  playerId,
}: {|
  playerId: string,
|}): Promise<TournamentsResponseRaw> =>
  http.get(`${URL.REEL_RACES}/${playerId}`);

export const optInForReelRaceReq = (data: {|
  playerId: string,
  tournamentId: string,
|}): Promise<{}> => http.post(`${URL.REEL_RACE_OPT_IN}`, data);
