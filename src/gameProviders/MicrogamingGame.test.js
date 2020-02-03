// @flow
import { DEFAULT_LANGUAGE } from "Models/handshake";
import { ENVIRONMENTS } from "Src/constants";
import { MicrogamingGame, COMMANDS, TARGET_DOMAINS } from "./MicrogamingGame";

describe("MicrogamingGame", () => {
  const gameData = {
    url:
      "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
    providerType: "MICROGAMING_MOBILE",
    providerName: "MICROGAMING",
  };
  const gameRef = { current: null };
  const model = new MicrogamingGame({
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
    expect(model.api.commands.pause).toBe(COMMANDS.PAUSE);
  });

  test("should set target domain", () => {
    expect(model.targetDomain).toBe(TARGET_DOMAINS[ENVIRONMENTS.TEST]);
  });
});
