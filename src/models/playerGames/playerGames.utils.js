import { types } from "Models/playerGames";
import { GAME_LIST_IDS } from "Src/constants";

export const getFetchCompleteTypeByPage = page =>
  `${types.PLAYER_GAMES_FETCH_COMPLETE}_PAGE${page}`;

export const getPlayerGamesListIdByPage = page =>
  `${GAME_LIST_IDS.PLAYER_GAMES}Page${page}`;
