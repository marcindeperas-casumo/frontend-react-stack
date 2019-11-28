// @flow
import { YggdrasilGame } from "./YggdrasilGame";

describe("YggdrasilGame", () => {
  const params = {
    url:
      "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
    providerType: "YGGDRASIL_MOBILE",
    providerName: "YGGDRASIL",
  };
  const gameRef = { current: null };
  const model = new YggdrasilGame(params, gameRef);

  test("should return the element as iframe", () => {
    expect(model.element).toBe("iframe");
  });

  test("should set api commands", () => {
    expect(model.api.features.instantPause).toBe(true);
    expect(model.api.commands.pause).toEqual("game/pause");
    expect(model.api.commands.resume).toEqual("game/resume");
  });
});
