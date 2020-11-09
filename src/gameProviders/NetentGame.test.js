// @flow
import * as utils from "Utils";
import { ENVIRONMENTS, DEFAULT_LANGUAGE } from "Src/constants";
import { NetentGame } from "./NetentGame";
import { NETENT_SCRIPT_URL } from "./netentConstants";

jest.mock("../utils/utils.js", () => ({
  ...jest.requireActual("../utils/utils.js"),
  injectScript: jest.fn().mockResolvedValue(),
}));

describe("NetentGame", () => {
  const gameData = {
    casinoId: "casumo",
    gameId: "starburst_mobile_html_sw",
    gameServer: "https://casumo-game.casinomodule.com",
    providerName: "NETENT",
    providerType: "NETENT",
    sessionId: "DEMO-a2a88a48-4ddf-410b-a5e6-80be9b1d96a6-GBP",
    staticServer: "https://casumo-static.casinomodule.com",
    width: "123",
    height: "234",
    lang: "en",
  };

  const gameDataWithUrlProperty = {
    providerName: "NETENT",
    providerType: "NETENT",
    url: `https://someBackendReturnedUrl.com?gameId=starburst_mobile_html_sw&gameServer=https://casumo-game.casinomodule.com
        &staticServer=https://casumo-static.casinomodule.com&casinoId=casumo&lang=en&liveCasinoHost=someHost&sessionId=DEMO-a2a88a48-4ddf-410b-a5e6-80be9b1d96a6-GBP`,
  };

  const customFnForKeys = key => {
    // eslint-disable-next-line no-nested-ternary
    return key === "gameServer"
      ? "gameServerURL"
      : key === "lang"
      ? "language"
      : key;
  };
  const gameURLParams = utils.queryParamsToJSObject({
    queryStringUrl: gameDataWithUrlProperty.url,
    customFnForKeys,
  });
  const defaultParams = {
    gameId: gameData.gameId,
    sessionId: gameData.sessionId,
    casinoId: gameData.casinoId,
    staticServer: decodeURIComponent(gameData.staticServer),
    gameServerURL: decodeURIComponent(gameData.gameServer),
  };

  const extractedGameDataFromUrl = Object.assign(
    {},
    defaultParams,
    gameURLParams
  );

  const gameRef = { current: null };

  const model = new NetentGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
  });

  const modelWithUrl = new NetentGame({
    gameData: { ...gameDataWithUrlProperty },
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
  });

  it("should call injectScript when onMount is called", () => {
    model.onMount();

    expect(utils.injectScript).toHaveBeenCalledWith(
      NETENT_SCRIPT_URL[ENVIRONMENTS.TEST]
    );
  });

  it("should still call injectScript when onMount is called with model containing urlProperty", () => {
    modelWithUrl.onMount();

    expect(utils.injectScript).toHaveBeenCalledWith(
      NETENT_SCRIPT_URL[ENVIRONMENTS.TEST]
    );
  });

  it("should return the element as div", () => {
    expect(model.componentTag).toBe("div");
  });

  it("should get the config", () => {
    expect(model.config).toStrictEqual({
      gameId: gameData.gameId,
      gameServerURL: gameData.gameServer,
      sessionId: gameData.sessionId,
      staticServer: gameData.staticServer,
      casinoId: "casumo",
      liveCasinoHost: null,
      lobbyURL: "#",
      height: "100%",
      width: "100%",
      launchType: "iframe",
      enforceRatio: false,
      applicationType: "browser",
      targetElement: "netent-game",
      language: DEFAULT_LANGUAGE,
    });
  });

  it("should get the config from URL parameter received in launchGame response", () => {
    expect(modelWithUrl.config).toStrictEqual({
      gameId: extractedGameDataFromUrl.gameId,
      gameServerURL: extractedGameDataFromUrl.gameServerURL,
      sessionId: extractedGameDataFromUrl.sessionId,
      staticServer: extractedGameDataFromUrl.staticServer,
      casinoId: "casumo",
      liveCasinoHost: "someHost",
      lobbyURL: "#",
      height: "100%",
      width: "100%",
      launchType: "iframe",
      enforceRatio: false,
      applicationType: "browser",
      targetElement: "netent-game",
      language: DEFAULT_LANGUAGE,
    });
  });

  it("should get the props", () => {
    expect(model.componentProps).toStrictEqual({
      id: "netent-game",
      ref: { current: null },
    });
  });
});
