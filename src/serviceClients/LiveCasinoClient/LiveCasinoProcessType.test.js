import React from "react";
import liveCasinoProcessType from "./LiveCasinoProcessType";

import games from "./__mocks__/gameBrowserLiveCasinoGames.json";
import lobby from "./__mocks__/lobbyState.json";

import State from "./__mocks__/State.json";
import PlayersUpdated from "./__mocks__/PlayersUpdated.json";
import RouletteNumbersUpdated from "./__mocks__/RouletteNumbersUpdated.json";

describe("liveCasinoProcessType", () => {
  let args;

  describe("should return correct state", () => {
    test("if `State` type received and lobby is empty", () => {
      args = { games, lobby: [], payload: State };
      const l = liveCasinoProcessType(args);
      expect(l).toEqual(lobby);
    });

    test("if `PlayersUpdated` type", () => {
      args = { games, lobby, payload: PlayersUpdated };
      const r = liveCasinoProcessType(args);
      const game = r.find(o => o.id === args.payload.tableId);
      expect(game.players).toEqual(args.payload.players);
    });

    test("if `RouletteNumbersUpdated` type", () => {
      args = { games, lobby, payload: RouletteNumbersUpdated };
      const r = liveCasinoProcessType(args);
      const game = r.find(o => o.id === args.payload.tableId);
      expect(game.results).toEqual(args.payload.results);
    });
  });
});
