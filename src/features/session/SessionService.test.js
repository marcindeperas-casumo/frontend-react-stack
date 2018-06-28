import { currentTimestamp } from "../../clock";
import { queryHandshake } from "./api";
import SessionService, { checkResponse, toSession } from "./SessionService";

jest.mock("./api");
jest.mock("../../clock");

let service;

beforeEach(() => {
  service = SessionService();
});

describe("checkValidSession()", () => {
  test("should throw if argument is null", () => {
    expect(() => checkResponse()).toThrowError("Session value is invalid");
  });

  test("should not throw if the arguments contains the session property", () => {
    expect(() =>
      checkResponse({
        "common/composition/session": {}
      })
    ).not.toThrow();
  });
});

describe("toSession()", () => {
  test("should match object shape", () => {
    expect(
      toSession({ id: 123, sessionId: 456, lastChecked: 1000 })
    ).toMatchObject({
      playerId: 123,
      sessionId: 456,
      lastChecked: 1000
    });
  });
});

describe("currentSession()", () => {
  test("should return a session object", async () => {
    currentTimestamp.mockReturnValue(1000);
    queryHandshake.mockResolvedValue({
      "common/composition/session": {
        id: 123,
        sessionId: 456
      }
    });

    expect.assertions(1);
    await expect(service.currentSession()).resolves.toMatchObject({
      playerId: 123,
      sessionId: 456,
      lastChecked: 1000
    });
  });

  test("should return an empty session if there is no active session", async () => {
    queryHandshake.mockReturnValue({});
    expect.assertions(1);
    await expect(service.currentSession()).resolves.toMatchObject({});
  });

  test("should reject if the api call fails", async () => {
    queryHandshake.mockRejectedValue("API error");

    expect.assertions(1);

    await expect(service.currentSession()).rejects.toEqual(
      Error("Failed to get session")
    );
  });
});

describe("currentPlayer()", () => {
  test("should return the current player object", async () => {
    queryHandshake.mockResolvedValue({
      "common/composition/players": {
        players: {
          123: {
            playerId: 123,
            casumoName: "player-1"
          }
        }
      },
      "common/composition/session": {
        id: 123,
        sessionId: 456
      }
    });

    expect(await service.currentPlayer()).toMatchObject({
      casumoName: "player-1",
      playerId: 123
    });
  });
});
