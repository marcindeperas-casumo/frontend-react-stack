// @flow
import { ENVIRONMENTS, DEFAULT_LANGUAGE } from "Src/constants";
import { GreentubeGame, COMMANDS } from "./GreentubeGame";

describe("GreentubeGame", () => {
  const gameData = {
    url:
      "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
    providerType: "GREENTUBE_MOBILE",
    providerName: "GREENTUBE",
  };
  const gameRef = { current: null };
  const model = new GreentubeGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
  });

  test("should return the element as iframe", () => {
    expect(model.componentTag).toBe("iframe");
  });

  test("should set instant pause", () => {
    expect(model.api.commands.pause).toBe(COMMANDS.PAUSE);
    expect(model.api.commands.resume).toBe(COMMANDS.RESUME);
  });
});
