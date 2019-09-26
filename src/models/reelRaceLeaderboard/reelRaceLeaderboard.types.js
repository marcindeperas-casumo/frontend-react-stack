// @flow
export type Leaderboard = {
  playerId: string,
  playerName: string,
  points: number,
  position: number,
  remainingSpins: number,
  boosters: {
    bigWins: number,
    megaWins: number,
    triples: number,
  },
};
