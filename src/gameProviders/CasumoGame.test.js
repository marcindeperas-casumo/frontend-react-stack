// @flow
import { CasumoGame } from "./CasumoGame";

describe("CasumoGame", () => {
  const params = {
    url:
      "https://clients.test.casumogames.com/wild-gruff-crossing/latest/index.html?serverUrl=https://client-connector.test.casumogames.com&gameName=wild-gruff-crossing-2&disableIOSFullScreen=false&accountType=REAL&playerSessionId=7ea71be9-64ea-422a-b750-6599be8b9e8c&jurisdiction=MGA&language=en",
    providerType: "CASUMO_MOBILE",
    providerName: "CASUMO",
  };
  const gameRef = { current: null };
  const model = new CasumoGame(params, gameRef);

  test("should return the element as iframe", () => {
    expect(model.element).toBe("iframe");
  });

  test("should return `src` property including `lobbyUrl` for back to lobby functionality", () => {
    expect(model.props.src).toContain("lobbyUrl");
  });

  test("should return `src` property including `iframeUrl` for communication with the game", () => {
    expect(model.props.src).toContain("iframeUrl");
  });

  test("should set api commands", () => {
    expect(model.api.features.instantPause).toBe(true);
    expect(model.api.commands.pause).toStrictEqual({
      event: "game/pause",
      data: "",
    });
    expect(model.api.commands.resume).toStrictEqual({
      event: "game/resume",
      data: "",
    });
  });
});
