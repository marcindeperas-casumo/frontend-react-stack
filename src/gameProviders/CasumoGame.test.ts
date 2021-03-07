// @flow
import { ENVIRONMENTS, DEFAULT_LANGUAGE } from "Src/constants";
import { CasumoGame, COMMANDS } from "./CasumoGame";

describe("CasumoGame", () => {
  const gameData = {
    url:
      "https://clients.test.casumogames.com/wild-gruff-crossing/latest/index.html?serverUrl=https://client-connector.test.casumogames.com&gameName=wild-gruff-crossing-2&disableIOSFullScreen=false&accountType=REAL&playerSessionId=7ea71be9-64ea-422a-b750-6599be8b9e8c&jurisdiction=MGA&language=en",
    providerType: "CASUMO_MOBILE",
    providerName: "CASUMO",
  };
  const gameRef = { current: null };
  const model = new CasumoGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
    urlPrefix: DEFAULT_LANGUAGE,
  });

  test("should return the element as iframe", () => {
    expect(model.componentTag).toBe("iframe");
  });

  test("should return `src` property including `lobbyUrl` for back to lobby functionality", () => {
    expect(model.componentProps.src).toContain("lobbyUrl");
  });

  test("should return `src` property including `iframeUrl` for communication with the game", () => {
    expect(model.componentProps.src).toContain("iframeUrl");
  });
  test("should set api commands", () => {
    expect(model.api.features.instantPause).toBe(true);
    expect(model.api.commands.pause).toStrictEqual(COMMANDS.PAUSE);
    expect(model.api.commands.resume).toStrictEqual(COMMANDS.RESUME);
  });
});
