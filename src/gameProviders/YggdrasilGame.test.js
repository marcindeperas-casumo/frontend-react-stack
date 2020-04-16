// @flow
import { ENVIRONMENTS, DEFAULT_LANGUAGE } from "Src/constants";
import { YggdrasilGame } from "./YggdrasilGame";

describe("YggdrasilGame", () => {
  const gameData = {
    url:
      "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
    providerType: "YGGDRASIL_MOBILE",
    providerName: "YGGDRASIL",
  };
  const gameRef = { current: null };
  const model = new YggdrasilGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
  });

  test("should return the element as iframe", () => {
    expect(model.componentTag).toBe("iframe");
  });

  test("should set api commands", () => {
    expect(model.api.features.instantPause).toBe(true);
    expect(model.api.commands.pause).toEqual("game/pause");
    expect(model.api.commands.resume).toEqual("game/resume");
  });
});
