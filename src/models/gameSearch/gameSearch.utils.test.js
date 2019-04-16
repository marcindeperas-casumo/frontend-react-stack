import {
  types,
  getSearchFetchCompleteTypeByPage,
  getgameSearchListIdByPage,
} from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

describe("Models/GameSearch/Utils", () => {
  const page = 2;

  test("getSearchFetchCompleteTypeByPage", () => {
    const query = "q pasa pixa";

    expect(getSearchFetchCompleteTypeByPage(query, page)).toEqual(
      `${types.GAME_SEARCH_FETCH_PAGE_COMPLETE}_${page}_${query}`
    );
  });

  test("getgameSearchListIdByPage", () => {
    expect(getgameSearchListIdByPage(page)).toEqual(
      `${GAME_LIST_IDS.GAME_SEARCH}Page${page}`
    );
  });
});
