// @flow
import { ENVIRONMENTS, DEFAULT_LANGUAGE } from "Src/constants";
import { PragmaticGame, COMMANDS } from "./PragmaticGame";

describe("PragmaticGame", () => {
  const gameData = {
    url:
      "https://casumo.prerelease-env.biz/gs2c/playGame.do…nchers/navigation-bubbler.html?target%3Dgames/top",
    providerType: "PRAGMATIC_MOBILE",
    providerName: "PRAGMATIC",
  };
  const gameRef = { current: null };
  const model = new PragmaticGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
  });

  test("should return the element as iframe", () => {
    expect(model.componentTag).toBe("iframe");
  });

  test("should set api commands", () => {
    expect(model.api.features.instantPause).toBe(false);
    expect(model.api.commands.pause).toEqual(COMMANDS.PAUSE);
    expect(model.api.commands.resume).toEqual(COMMANDS.RESUME);
  });
});
