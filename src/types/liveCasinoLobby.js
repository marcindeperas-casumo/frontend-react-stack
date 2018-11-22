// @flow
type Bets = {
  symbol: string,
  min: number,
  max: number,
};

export type liveCasinoLobby = {
  image: string,
  bets: Bets,
  players: number,
  provider: string,
};
