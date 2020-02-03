// @flow
import { DEFAULT_LANGUAGE } from "Models/handshake";
import { ENVIRONMENTS } from "Src/constants";
import { OryxGame, COMMANDS } from "./OryxGame";

describe("OryxGame", () => {
  const gameData = {
    url:
      "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
    providerType: "ORYX_MOBILE",
    providerName: "ORYX",
  };
  const gameRef = { current: null };
  const model = new OryxGame({
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
