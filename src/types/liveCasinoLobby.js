// @flow
import * as A from "Types/apollo";
import type { EvolutionLobbyType } from "Models/liveCasino";

export type liveCasinoLobby = {
  type: EvolutionLobbyType,
  tableId: string,
  image: string,
  bets: A.GameRow_Game_lobby_bets,
  players: number,
  seats: number,
  provider: string,
  results: [string],
  history: [string],
  betBehind?: boolean,
};
