// @flow
import { ENVIRONMENTS, DEFAULT_LANGUAGE } from "Src/constants";
import { RelaxGame, COMMANDS } from "./RelaxGame";

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
    expect(model.api.commands.pause).toEqual(COMMANDS.PAUSE);
    expect(model.api.commands.resume).toEqual(COMMANDS.RESUME);
  });
});
