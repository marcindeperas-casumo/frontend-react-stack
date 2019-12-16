// @flow
import { DEFAULT_LANGUAGE } from "Models/handshake";
import { ENVIRONMENTS } from "Src/constants";
import { RelaxGame } from "./RelaxGame";

describe("RelaxGame", () => {
  const gameData = {
    url: "https://example.com",
    providerType: "RELAX_MOBILE",
    providerName: "RELAX",
  };
  const gameRef = { current: null };
  const model = new RelaxGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
  });

  test("should return the element as iframe", () => {
    expect(model.componentTag).toBe("iframe");
  });

  test("should set api commands", () => {
    expect(model.api.commands.pause).toEqual({
      method: "pauseGame",
      params: {
        callback: "gamePausedHandler",
      },
    });
    expect(model.api.commands.resume).toEqual({
      method: "resumeGame",
      params: {},
    });
  });
});
