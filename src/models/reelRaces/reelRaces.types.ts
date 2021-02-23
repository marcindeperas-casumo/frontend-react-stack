// @flow

export type ReelRacesTranslations = {
  spins: string,
  duration: string,
  duration_template: string,
  min_bet: string,
  starting_in: string,
  ending_in: string,
  opt_in: string,
  opted_in: string,
  opted_in_cta_single_game_short: string, // play
  compete_for: string,
  title: string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  caveat_short: ?string, // for some reason it's rather "false" than empty
  prize_win_tagline?: string,
  spin_count?: string,
};

export type CometdLeaderboard = {
  boosters: {
    winsInARow: number,
    triples: number,
    wins: number,
    bigWins: number,
    megaWins: number,
  },
  mostPlayedGame: string, // legacy, don't use
  playerId: string,
  playerName: string,
  points: number, // only relevant for active player
  position: number, // only relevant for active player
  remainingSpins: number, // only relevant for active player
};

export type CometdLeaderboardUpdate = {
  channel: string,
  data: {
    leaderboard: {
      // @ts-expect-error ts-migrate(1170) FIXME: A computed property name in a type literal must re... Remove this comment to see the full error message
      [string]: CometdLeaderboard,
    },
  },
};
