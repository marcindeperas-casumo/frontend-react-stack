// @flow

// object stored in redux store
export type ReelRace = {
  tournamentId: string,
  startTime: number, // timestamp
  endTime: number, // timestamp
  minBet: ?string, // if missing there's no minimal bet
  spins: number,
  promoted: boolean,
  gameSlug: string,
  opted: boolean,
  color: string,
  prize: string,
  status: string,
};

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
  caveat_short: ?string, // for some reason it's rather "false" than
  prize_win_tagline?: string,
};

type LeaderboardEntryRaw = {
  playerId: string,
  playerName: string,
  position: number,
  points: number,
  remainingSpins: number,
  mostPlayedGame: ?string,
  boosters: {|
    winsInARow: number,
    triples: number,
    wins: number,
    bigWins: number,
    megaWins: number,
  |},
};

export type TournamentPrizeRaw = {
  badgeRuleName: string, // with | acting as separator? is it always "(...)|slug=free-money-template"?
  serializedItemUsables: [
    // is it tuple or array?
    {
      usableClassName: "FreeMoneyUsableUsedEvent", // other?
      usableJSON: string, // always "{}"?
    }
  ],
  templateParameterValues: {|
    amountGiven: string, // stringified JSON, "{\"amount\":5.0000,\"iso4217CurrencyCode\":\"EUR\"}"?
  |},
};

export type TournamentRaw = {
  tournamentId: string,
  status: "Scheduled" | "Started",
  type: "Standard" | "Promoted",
  campaignId: string,
  contentId: "default",
  startTime: number, // timestamp
  endTime: number, // timestamp
  minBetByCurrency: {
    [string]: number,
  },
  prizes: Array<TournamentPrizeRaw>,
  gameConfiguration: {
    gamesAreInclusive: boolean,
    gameNames: Array<string>, // Array<GameSlug>
  },
  leaderboard: {
    [string]: LeaderboardEntryRaw,
  },
  spinLimit: number,
  winner: ?string, // guessing, it's null everywhere
  numberOfParticipants: number,
  promoted: boolean, // true if type === "Promoted", duh
};

// raw response from the server
export type TournamentsResponseRaw = {
  campaignId: string, // "notUsed"?
  tournaments: {
    [string]: TournamentRaw,
  },
  gamesAreInclusive: boolean,
  gameNames: Array<string>,
  tournamentChannels: Array<string>,
};
