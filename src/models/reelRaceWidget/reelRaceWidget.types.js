// @flow
export type LeaderBoard = {
  playerId: string,
  playerName: string,
  points: number,
  position: number,
  remainingSpins: number,
  boosters: {
    bigWins: number,
    megaWins: number,
    triples: number,
    wins: number,
    winsInARow: number,
  },
};
