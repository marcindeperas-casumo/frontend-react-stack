import config from "Src/config";
import {
  schemaSelector,
  gameListEntitiesSelector,
  gameEntitiesSelector,
  liveTableEntitiesSelector,
  liveCasinoEntitiesSelector,
  jackpotEntitiesSelector,
  topListIds,
  topListSelectorById,
  topListSelectorByQuery,
  gameListSelector,
  gameSelector,
  gameListTitleSelectorFactory,
  areGameListsLoaded,
  mustDropJackpotsIdsSelector,
  isGameListFetchedFactory,
} from "Reducers/schema/selector";

describe("Schema selectors", () => {
  test("schemaSelector", () => {
    const state = {
      schema: { foo: "bar" },
    };

    expect(schemaSelector(state)).toEqual({ foo: "bar" });
  });

  test("gameListEntitiesSelector", () => {
    const state = {
      schema: { gameList: { l1: 1 } },
    };

    expect(gameListEntitiesSelector(state)).toEqual({ l1: 1 });
  });

  test("gameEntitiesSelector", () => {
    const state = {
      schema: { game: { g1: 1 } },
    };

    expect(gameEntitiesSelector(state)).toEqual({ g1: 1 });
  });

  test("liveTableEntitiesSelector", () => {
    const state = {
      schema: { liveTable: { lt1: 1 } },
    };

    expect(liveTableEntitiesSelector(state)).toEqual({ lt1: 1 });
  });

  test("liveCasinoEntitiesSelector", () => {
    const state = {
      schema: { liveCasino: { lc1: 1 } },
    };

    expect(liveCasinoEntitiesSelector(state)).toEqual({ lc1: 1 });
  });

  test("jackpotEntitiesSelector", () => {
    const state = {
      schema: { jackpot: { j1: 1 } },
    };

    expect(jackpotEntitiesSelector(state)).toEqual({ j1: 1 });
  });

  test("topListIds", () => {
    const state = {
      schema: { gameList: { l1: 1 } },
    };

    expect(topListIds(state)).toEqual(["l1"]);
  });

  test("topListSelectorById()", () => {
    const id = "l1";
    const state = {
      schema: {
        gameList: {
          [id]: {
            id,
            games: ["book-of-ra-deluxe", "diamond-mine", "raging-rhino"],
          },
        },
      },
    };
    const selected = topListSelectorById(id)(state);

    expect(selected.id).toEqual(id);
    expect(selected.games).toEqual(state.schema.gameList[id].games);
  });

  test("topListSelectorByQuery() - can exclude maintenance games", () => {
    const id = "l1";
    const state = {
      schema: {
        gameList: {
          [id]: {
            id,
            games: ["book-of-ra-deluxe", "diamond-mine", "raging-rhino"],
          },
        },
        game: {
          "book-of-ra-deluxe": {
            name: "Book of Ra deluxe",
            slug: "book-of-ra-deluxe",
            hasPlayForFun: false,
            inMaintenanceMode: false,
          },
          "diamond-mine": {
            name: "Diamond Mine",
            slug: "diamond-mine",
            hasPlayForFun: true,
            inMaintenanceMode: false,
          },
          "raging-rhino": {
            name: "Raging Rhino",
            slug: "raging-rhino",
            hasPlayForFun: true,
            inMaintenanceMode: true,
          },
        },
      },
    };
    const selected = topListSelectorByQuery(id, { maintenance: false })(state);

    expect(selected.id).toEqual(id);
    expect(selected.games).toEqual(["book-of-ra-deluxe", "diamond-mine"]);
  });

  test("gameListSelectorByQuery() - can exclude games in maintenance mode", () => {
    const id = "l1";
    const state = {
      schema: {
        gameList: {
          [id]: {
            id,
            games: ["book-of-ra-deluxe", "diamond-mine", "raging-rhino"],
          },
        },
        game: {
          "book-of-ra-deluxe": {
            name: "Book of Ra deluxe",
            slug: "book-of-ra-deluxe",
            hasPlayForFun: false,
            inMaintenanceMode: false,
          },
          "diamond-mine": {
            name: "Diamond Mine",
            slug: "diamond-mine",
            hasPlayForFun: true,
            inMaintenanceMode: false,
          },
          "raging-rhino": {
            name: "Raging Rhino",
            slug: "raging-rhino",
            hasPlayForFun: true,
            inMaintenanceMode: true,
          },
        },
      },
    };
    const selected = gameListSelector(id, { maintenance: false })(state);

    expect(selected.id).toEqual(id);
    expect(selected.games).toEqual(["book-of-ra-deluxe", "diamond-mine"]);
  });

  test("gameListSelector() - should include maintenance games in specified lists ", () => {
    const { gameListsShowingMaintenanceGames } = config;
    const id1 = "game-list-2";
    const [id2] = gameListsShowingMaintenanceGames;
    const state = {
      schema: {
        gameList: {
          [id1]: {
            id: id1,
            games: ["book-of-ra-deluxe", "diamond-mine", "raging-rhino"],
          },
          [id2]: {
            id: id2,
            games: ["book-of-ra-deluxe", "diamond-mine", "raging-rhino"],
          },
        },
        game: {
          "book-of-ra-deluxe": {
            name: "Book of Ra deluxe",
            slug: "book-of-ra-deluxe",
            hasPlayForFun: false,
            inMaintenanceMode: false,
          },
          "diamond-mine": {
            name: "Diamond Mine",
            slug: "diamond-mine",
            hasPlayForFun: true,
            inMaintenanceMode: false,
          },
          "raging-rhino": {
            name: "Raging Rhino",
            slug: "raging-rhino",
            hasPlayForFun: true,
            inMaintenanceMode: true,
          },
        },
      },
    };
    const query = { maintenance: false };
    const selected1 = gameListSelector(id1, query)(state);
    const selected2 = gameListSelector(id2, query)(state);

    expect(selected1.id).toEqual(id1);
    expect(selected1.games).toEqual(["book-of-ra-deluxe", "diamond-mine"]);
    expect(selected2.id).toEqual(id2);
    expect(selected2.games).toEqual([
      "book-of-ra-deluxe",
      "diamond-mine",
      "raging-rhino",
    ]);
  });

  describe("gameSelector", () => {
    test("return the game object", () => {
      const state = {
        schema: { game: { game1: { id: "game1" } } },
      };

      expect(gameSelector("game1")(state)).toEqual({ id: "game1" });
    });

    test("attach the jackpot data based on the jackpotId", () => {
      const state = {
        schema: {
          game: {
            game1: { id: "game1", jackpotId: "j1" },
          },
          jackpot: { j1: { id: "j1", foo: "jackpot" } },
        },
      };

      expect(gameSelector("game1")(state)).toEqual({
        id: "game1",
        jackpotId: "j1",
        jackpotInfo: { id: "j1", foo: "jackpot" },
      });
    });

    test("attach the listTable data based on the tableId", () => {
      const state = {
        schema: {
          game: {
            game1: { id: "game1", tableId: "lt1" },
          },
          liveTable: { lt1: { id: "lt1", foo: "live-table" } },
        },
      };

      expect(gameSelector("game1")(state)).toEqual({
        id: "game1",
        tableId: "lt1",
        lobby: { id: "lt1", foo: "live-table" },
      });
    });

    test("ignore jackpotEntities or liveTableEntities if there are none", () => {
      const state = {
        schema: {
          game: {
            game1: { id: "game1" },
          },
        },
      };

      expect(gameSelector("game1")(state)).toEqual({
        id: "game1",
      });
    });
  });

  describe("gameListTitleSelectorFactory", () => {
    test("returns the title of the list by id", () => {
      const state = {
        schema: {
          gameList: {
            latestPlayedGames: {
              games: [
                "bloodsuckers",
                "easter-island",
                "starburst",
                "bakers-treat",
                "rapunzels-tower",
                "big-bad-wolf",
              ],
              id: "latestPlayedGames",
              title: "Last Played",
            },
          },
        },
      };
      const selector = gameListTitleSelectorFactory("latestPlayedGames");

      expect(selector(state)).toBe("Last Played");
    });
  });

  describe("mustDropJackpotsIdsSelector()", () => {
    test("should return the Must Drop Jackpots game ids given a schema", () => {
      const state = {
        schema: {
          gameList: {
            mustDropJackpotGames: {
              games: ["I am", "a sweet", "must drop", "jackpot game"],
              id: "mustDropJackpotGames",
              title: "Must Drop Jackpot Game",
            },
          },
        },
      };
      const selector = mustDropJackpotsIdsSelector(state);

      expect(selector).toEqual([
        "I am",
        "a sweet",
        "must drop",
        "jackpot game",
      ]);
    });
  });

  describe("isGameListFetchedFactory()", () => {
    test("should return null if the game list doesn't exist on the state", () => {
      const state = {
        schema: {
          gameList: {},
        },
      };
      const selector = isGameListFetchedFactory("IAmATestListAndIDontExist 🍆")(
        state
      );

      expect(selector).toBe(null);
    });
  });

  describe("areGameListsLoaded()", () => {
    test("returns TRUE if the gameLists are not empty", () => {
      const state = {
        schema: {
          gameList: {
            latestPlayedGames: {
              games: [
                "bloodsuckers",
                "easter-island",
                "starburst",
                "bakers-treat",
                "rapunzels-tower",
                "big-bad-wolf",
              ],
              id: "latestPlayedGames",
              title: "Last Played",
            },
          },
        },
      };

      expect(areGameListsLoaded(state)).toBe(true);
    });

    test("returns FALSE if the gameLists are empty", () => {
      const state = {
        schema: {
          gameList: {},
        },
      };

      expect(areGameListsLoaded(state)).toBe(false);
    });
  });
});
