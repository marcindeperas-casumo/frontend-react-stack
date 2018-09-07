import React from "react";
import LiveCasinoClient from "./LiveCasinoClient";
import { Server } from "mock-socket";

import PlayersUpdated from "../applicationService/__mocks__/PlayersUpdated.json";

jest.useFakeTimers();

// socketState:
//   CONNECTING = 0
//.  OPEN = 1
//   CLOSING = 2
//   CLOSED = 3

describe("LiveCasinoClient", () => {
  let msgs = [];
  let fakeUrl = "ws://localhost:8080";
  let mockServer;
  let client;

  beforeEach(() => {
    mockServer = new Server(fakeUrl);
    client = new LiveCasinoClient(fakeUrl);
  });

  afterEach(() => {
    mockServer.stop();
  });

  describe("onopen", () => {
    test("`socketState` should be CONNECTING", () => {
      expect(client.socketState).toBe(0);
    });

    test("`socketState` should be OPEN", () => {
      jest.runOnlyPendingTimers();
      expect(client.socketState).toBe(1);
    });

    test("`reconnectAttempts` if connected should be 0", () => {
      jest.runOnlyPendingTimers();
      expect(client.reconnectAttempts).toBe(0);
    });
  });

  describe("onmessage", () => {
    test("should return JSON parsed", () => {
      mockServer.on("connection", socket => {
        socket.send(JSON.stringify(PlayersUpdated));
      });
      client.onmessage = m => msgs.push(m);

      jest.runOnlyPendingTimers();
      expect(typeof msgs[0]).toBe("object");
      expect(msgs[0]).toEqual(PlayersUpdated);
    });
  });

  describe("onclose, if clean", () => {
    test("should reconnect and `socketState` should be CONNECTING", () => {
      mockServer.on("connection", socket => socket.close());
      expect(client.socketState).toBe(0);
    });

    test("should be reconnected and `socketState` should be OPEN", () => {
      mockServer.on("connection", socket => socket.close());
      jest.runOnlyPendingTimers();
      expect(client.socketState).toBe(1);
    });
  });

  describe("onerror", () => {
    test("`socketState` should be CLOSING", () => {
      mockServer.simulate("error");
      expect(client.socketState).toBe(2);
    });

    test("`socketState` should be CLOSED", () => {
      mockServer.simulate("error");
      jest.runOnlyPendingTimers();
      console.log(client.exponentialTimeout);
      expect(client.socketState).toBe(3);
    });

    test("`exponentialTimeout` should be default before closing", () => {
      mockServer.simulate("error");
      expect(client.exponentialTimeout).toBe(0);
    });

    test("`exponentialTimeout` should be increased", () => {
      mockServer.simulate("error");
      jest.runOnlyPendingTimers();
      expect(client.exponentialTimeout).toBe(1000);
    });
  });
});
