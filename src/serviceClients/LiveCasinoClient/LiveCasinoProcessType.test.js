import React from "react";
import liveCasinoProcessType from "./LiveCasinoProcessType";

// mocks
import gameBrowser from "./__mocks__/gameBrowser.json";
import lobbyTables from "./__mocks__/lobbyTables.json";

import State from "./__mocks__/State.json";
import PlayersUpdated from "./__mocks__/PlayersUpdated.json";

describe("liveCasinoProcessType", () => {

  describe("should return correct state", () => {
    it("if `State` type", () => {
      const r = liveCasinoProcessType(gameBrowser, State);
      expect(r).toEqual(lobbyTables);
    });
  });
});
