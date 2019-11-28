// @flow
import { EdictGame } from "./EdictGame";

describe("EdictGame", () => {
  const params = {
    url:
      "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
    providerType: "EDICT_MOBILE",
    providerName: "EDICT",
  };
  const gameRef = { current: null };
  const model = new EdictGame(params, gameRef);

  test("should return the element as iframe", () => {
    expect(model.element).toBe("iframe");
  });

  test("should return `src` property including `referrerUrl` for back to lobby functionality", () => {
    expect(model.props.src).toContain("referrerUrl");
  });

  test("should set api commands", () => {
    expect(model.api.features.instantPause).toBe(true);
    expect(model.api.commands.pause).toBe("pauseGame");
    expect(model.api.commands.resume).toBe("resumeGame");
  });
});
