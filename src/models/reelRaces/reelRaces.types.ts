export type ReelRacesTranslations = {
  spins: string;
  duration: string;
  duration_template: string;
  min_bet: string;
  starting_in: string;
  ending_in: string;
  opt_in: string;
  opted_in: string;
  opted_in_cta_single_game_short: string; // play
  compete_for: string;
  title: string;
  caveat_short: string | undefined; // for some reason it's rather "false" than empty
  prize_win_tagline?: string;
  spin_count?: string;
};

export type CometdLeaderboard = {
  boosters: {
    winsInARow: number;
    triples: number;
    wins: number;
    bigWins: number;
    megaWins: number;
  };
  mostPlayedGame: string; // legacy, don't use
  playerId: string;
  playerName: string;
  points: number; // only relevant for active player
  position: number; // only relevant for active player
  remainingSpins: number; // only relevant for active player
};

export type CometdLeaderboardUpdate = {
  channel: string;
  data: {
    leaderboard: {
      [s: string]: CometdLeaderboard;
    };
  };
};
