

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GameRowGame
// ====================================================

export type GameRowGame_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};

export type GameRowGame_lobby = {
  bets: ?GameRowGame_lobby_bets
};

export type GameRowGame_jackpotInfo = {
  id: string,
  formattedJackpotAmount: ?string,
};

export type GameRowGame = {
  slug: string,
  name: string,
  logo: string,
  logoBackground: string,
  lobby: ?GameRowGame_lobby,
  jackpotInfo: ?GameRowGame_jackpotInfo,
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