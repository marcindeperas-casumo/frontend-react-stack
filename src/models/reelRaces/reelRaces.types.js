// @flow
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
  caveat_short: ?string, // for some reason it's rather "false" than empty
};
