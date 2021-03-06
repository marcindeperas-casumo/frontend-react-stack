import { ENVIRONMENTS, DEFAULT_LANGUAGE } from "Src/constants";
import { RedTigerGame, COMMANDS } from "./RedTigerGame";

describe("RedTigerGame", () => {
  const gameData = {
    url: "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
    providerType: "REDTIGER_MOBILE",
    providerName: "REDTIGER",
  };
  const gameRef = { current: null };
  const model = new RedTigerGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
    urlPrefix: DEFAULT_LANGUAGE,
  });

  test("should return the element as iframe", () => {
    expect(model.componentTag).toBe("iframe");
  });

  test("should set api commands", () => {
    expect(model.api.commands.pause).toEqual(COMMANDS.PAUSE);
    expect(model.api.commands.resume).toEqual(COMMANDS.RESUME);
  });
});
