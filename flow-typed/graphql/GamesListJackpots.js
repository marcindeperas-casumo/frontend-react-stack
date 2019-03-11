

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GamesListJackpots
// ====================================================

export type GamesListJackpots_gamesList_games_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};

export type GamesListJackpots_gamesList_games_lobby = {
  bets: ?GamesListJackpots_gamesList_games_lobby_bets
};

export type GamesListJackpots_gamesList_games_jackpotInfo = {
  id: string,
  formattedJackpotAmount: ?string,
};

export type GamesListJackpots_gamesList_games = {
  slug: string,
  name: string,
  logo: string,
  logoBackground: string,
  lobby: ?GamesListJackpots_gamesList_games_lobby,
  jackpotInfo: ?GamesListJackpots_gamesList_games_jackpotInfo,
};

export type GamesListJackpots_gamesList = {
  title: ?string,
  games: ?Array<?GamesListJackpots_gamesList_games>,
};

export type GamesListJackpots = {
  gamesList: GamesListJackpots_gamesList
};

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================