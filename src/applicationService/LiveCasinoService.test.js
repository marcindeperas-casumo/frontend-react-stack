import React from "react";
import LiveCasinoService from "./LiveCasinoService";

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
      const l = LiveCasinoService.processLobby(args);
      expect(l).toEqual(lobby);
    });

    test("if `PlayersUpdated` type received", () => {
      args = { games, lobby, payload: PlayersUpdated };
      const l = LiveCasinoService.processLobby(args);
      const game = l.find(o => o.id === args.payload.tableId);
      expect(game.players).toEqual(args.payload.players);
    });

    test("if `RouletteNumbersUpdated` type received", () => {
      args = { games, lobby, payload: RouletteNumbersUpdated };
      const l = LiveCasinoService.processLobby(args);
      const game = l.find(o => o.id === args.payload.tableId);
      expect(game.results).toEqual(args.payload.results);
    });
  });
});
