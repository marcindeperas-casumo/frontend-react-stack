// @flow
import { NETENT_SCRIPT_URL, NetentGame } from "./NetentGame";

describe("NetentGame", () => {
  const params = {
    casinoId: "casumo",
    gameId: "starburst_mobile_html_sw",
    gameServer: "https://casumo-game.casinomodule.com",
    providerName: "NETENT",
    providerType: "NETENT",
    sessionId: "DEMO-a2a88a48-4ddf-410b-a5e6-80be9b1d96a6-GBP",
    staticServer: "https://casumo-static.casinomodule.com",
    width: "123",
    height: "234",
  };

  const gameRef = { current: null };
  const model = new NetentGame(params, gameRef);

  it("should call addScript when onMount is called", () => {
    model.addScript = jest.fn();
    model.onMount();

    expect(model.addScript).toHaveBeenCalledWith(
      NETENT_SCRIPT_URL,
      expect.any(Function)
    );
  });

  it("should return the element as div", () => {
    expect(model.element).toBe("div");
  });

  it("should goToLobby", () => {
    // eslint-disable-next-line fp/no-delete
    delete window.location.replace;
    window.location.replace = jest.fn();

    model.goToLobby();

    expect(window.location.replace).toHaveBeenCalledWith(
      `${window.location}en/games/top`
    );
  });

  it("should get the config", () => {
    expect(model.config).toStrictEqual({
      gameId: params.gameId,
      gameServerURL: params.gameServer,
      sessionId: params.sessionId,
      staticServer: params.staticServer,
      lobbyURL: "#",
      height: "100%",
      width: "100%",
      launchType: "iframe",
      enforceRatio: false,
      applicationType: "browser",
      targetElement: "netent-game",
      language: "en",
    });
  });

  it("should get the props", () => {
    expect(model.props).toStrictEqual({
      id: "netent-game",
      ref: { current: null },
    });
  });
});
