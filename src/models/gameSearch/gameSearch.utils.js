// @flow
import { types } from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

export const getSearchFetchCompleteTypeByPage = (query: string, page: number) =>
  `${types.GAME_SEARCH_FETCH_PAGE_COMPLETE}_${page}_${query}`;

export const getgameSearchListIdByPage = (page: number) =>
  `${GAME_LIST_IDS.GAME_SEARCH}Page${page}`;
