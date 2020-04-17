// @flow
import { ENVIRONMENTS, DEFAULT_LANGUAGE } from "Src/constants";
import { EdictGame, COMMANDS } from "./EdictGame";

describe("EdictGame", () => {
  const gameData = {
    url:
      "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
    providerType: "EDICT_MOBILE",
    providerName: "EDICT",
  };
  const gameRef = { current: null };
  const model = new EdictGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
  });

  test("should return the element as iframe", () => {
    expect(model.componentTag).toBe("iframe");
  });

  test("should return `src` property including `referrerUrl` for back to lobby functionality", () => {
    expect(model.componentProps.src).toContain("referrerUrl");
  });

  test("should set api commands", () => {
    expect(model.api.features.instantPause).toBe(true);
    expect(model.api.commands.pause).toBe(COMMANDS.PAUSE);
    expect(model.api.commands.resume).toBe(COMMANDS.RESUME);
  });
});
