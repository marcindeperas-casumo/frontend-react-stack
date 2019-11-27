// @flow
import { BaseGame } from "./BaseGame";

describe("BaseGame", () => {
  const params = {
    url:
      "https://d1k6j4zyghhevb.cloudfront.net/casino/launc…&partnerid=11&moneymode=fun&lang=en___&login=demo",
    providerType: "RELAX_HTML5",
    providerName: "RELAX",
  };
  const gameRef = { current: null };
  const model = new BaseGame(params, gameRef);

  test("should set gameData params and gameRef in constructor", () => {
    expect(model.gameData).toEqual(params);
    expect(model.gameRef).toEqual(gameRef);
  });

  test("should return the element as div", () => {
    expect(model.element).toBe("div");
  });

  test("should return props with gameRef", () => {
    expect(model.props).toEqual({ ref: { current: null } });
  });

  test("should return lobbyUrl", () => {
    expect(model.lobbyUrl).toBe("http://localhost/");
  });

  expect(model.onMount).toBeInstanceOf(Function);
  expect(model.onUnmount).toBeInstanceOf(Function);
  expect(model.pauseGame).toBeInstanceOf(Function);
  expect(model.resumeGame).toBeInstanceOf(Function);
});
