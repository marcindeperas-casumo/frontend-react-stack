// @flow
import type { EvolutionLobbyType } from "Models/liveCasino";

export type Bets = {
  symbol: string,
  min: number,
  max: number,
};

export type liveCasinoLobby = {
  type: EvolutionLobbyType,
  tableId: string,
  image: string,
  bets: Bets,
  players: number,
  seats: number,
  provider: string,
  results: [string],
};
