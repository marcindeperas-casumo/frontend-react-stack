import React from "react";
import LiveCasinoService from "./LiveCasinoService";

import games from "./__mocks__/gameBrowserLiveCasinoGames.json";
import lobby from "./__mocks__/lobbyState.json";
import lcGamesList from "./__mocks__/liveCasinoGames.json";

import State from "./__mocks__/State.json";
import PlayersUpdated from "./__mocks__/PlayersUpdated.json";
import RouletteNumbersUpdated from "./__mocks__/RouletteNumbersUpdated.json";

describe("liveCasinoProcessType", () => {
  let args;
  let service;
  let conf;

  beforeEach(() => {
    service = LiveCasinoService;
    conf = { country: "GB", currency: "GBP" };
    service.config.set(conf);
  });

  describe("LiveCasinoService config", () => {
    test("should get country set", () => {
      expect(service.config.get().country).toEqual(conf.country);
    });

    test("should get currency set", () => {
      expect(service.config.get().currency).toEqual(conf.currency);
    });

    test("should get default marketsIds", () => {
      expect(service.config.get().marketsIds).toEqual([
        "liveCasinoGames",
        "liveCasino",
      ]);
    });
  });

  describe("LiveCasinoService ifLiveCasino", () => {
    test("should match ids for different markets", () => {
      expect(service.ifLiveCasino("someGamesListId")).toBe(false);
    });

    test("should match ids for different markets", () => {
      expect(service.ifLiveCasino("liveCasino")).toBe(true);
    });
  });

  describe("LiveCasinoService processLobby", () => {
    describe("should return new Lobby state", () => {
      test("when `State` type received and lobby is empty", () => {
        args = { games, lobby: [], payload: State };
        const l = LiveCasinoService.processLobby(args);
        expect(l).toEqual(lobby);
      });

      test("when `PlayersUpdated` type received", () => {
        args = { games, lobby, payload: PlayersUpdated };
        const l = LiveCasinoService.processLobby(args);
        const game = l.find(o => o.id === args.payload.tableId);
        expect(game.players).toEqual(args.payload.players);
      });

      test("when `RouletteNumbersUpdated` type received", () => {
        args = { games, lobby, payload: RouletteNumbersUpdated };
        const l = LiveCasinoService.processLobby(args);
        const game = l.find(o => o.id === args.payload.tableId);
        expect(game.results).toEqual(args.payload.results);
      });
    });

    describe("should return null", () => {
      test("when unknown type received", () => {
        args = { games, lobby: [], payload: {} };
        const l = LiveCasinoService.processLobby(args);
        expect(l).toBe(null);
      });
    });
  });

  describe("LiveCasinoService getLiveCasinoGames", () => {
    test("should return empty list if no lobby data", () => {
      expect(service.getLiveCasinoGames(games, []).length).toBe(0);
    });

    test("should merge lobby data with games list from gameBrowserService", () => {
      expect(service.getLiveCasinoGames(games, lobby).length).toBe(5);
      expect(service.getLiveCasinoGames(games, lobby)).toEqual(lcGamesList);
    });
  });
});
