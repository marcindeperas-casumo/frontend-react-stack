import React from "react";
import LiveCasinoServiceEvo from "./LiveCasinoServiceEvo";

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
    service = LiveCasinoServiceEvo;
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

  describe("LiveCasinoService ifLiveCasinoId", () => {
    test("should match ids for different markets", () => {
      expect(service.ifLiveCasinoId("someGamesListId")).toBe(false);
    });

    test("should match ids for different markets", () => {
      expect(service.ifLiveCasinoId("liveCasino")).toBe(true);
    });
  });

  describe("LiveCasinoService processLobby NO throttle", () => {
    describe("should return new Lobby state", () => {
      test("when `State` type received and lobby is empty", () => {
        args = { games, lobby: [], payload: State };
        const l = service.processLobby(args);
        expect(l).toEqual(lobby);
      });

      test("when `PlayersUpdated` type received", () => {
        args = { games, lobby, payload: PlayersUpdated };
        const l = service.processLobby(args, 0);
        const game = l.find(o => o.id === args.payload.tableId);
        expect(game.players).toEqual(args.payload.players);
      });

      test("when `RouletteNumbersUpdated` type received", () => {
        args = { games, lobby, payload: RouletteNumbersUpdated };
        const l = service.processLobby(args, 0);
        const game = l.find(o => o.id === args.payload.tableId);
        expect(game.results).toEqual(args.payload.results);
      });
    });

    describe("should return null", () => {
      test("when unknown type received", () => {
        args = { games, lobby: [], payload: {} };
        const l = service.processLobby(args, 0);
        expect(l).toBe(undefined);
      });
    });
  });

  describe("LiveCasinoService processLobby throttle", () => {
    let limit = 5000;
    describe("should return udefined before 5s", () => {
      test("when `PlayersUpdated` type received", () => {
        args = { games, lobby, payload: PlayersUpdated };
        const l = service.processLobby(args, limit);
        expect(l).toBe(undefined);
      });
    });

    describe("should return new Lobby state after 5s", () => {
      test("when `PlayersUpdated` type received", () => {
        args = { games, lobby, payload: PlayersUpdated };
        service.processLobby(args, limit);
        setTimeout(() => {
          const l = service.processLobby(args, limit);
          const game = l.find(o => o.id === args.payload.tableId);
          expect(game.players).toEqual(args.payload.players);
        }, limit);
      });
    });

    describe("should return null", () => {
      test("when unknown type received", () => {
        args = { games, lobby: [], payload: {} };
        const l = service.processLobby(args, limit);
        expect(l).toBe(undefined);
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
