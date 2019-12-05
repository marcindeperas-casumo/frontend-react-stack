// @flow
import { BaseIframeGame } from "./BaseIframeGame";

export const baseIframeGameApi = {
  commands: {
    pause: null,
    resume: null,
  },
  events: {
    onPauseEnded: null,
    onGameRoundStart: null,
    onGameRoundEnd: null,
  },
  features: {
    instantPause: false,
  },
};
export const baseIframeGameProps = {
  ref: { current: null },
  allow: "autoplay",
  src: "src",
  title: "casumo-game",
  style: {
    border: 0,
    height: "100%",
    width: "100%",
  },
};

describe("BaseIframeGame", () => {
  const params = {
    url:
      "https://d1k6j4zyghhevb.cloudfront.net/casino/launc…&partnerid=11&moneymode=fun&lang=en___&login=demo",
    providerType: "RELAX_HTML5",
    providerName: "RELAX",
  };
  const props = {
    ...baseIframeGameProps,
    src: params.url,
  };
  const gameRef = { current: null };
  const model = new BaseIframeGame(params, gameRef);

  test("should set gameData params and gameRef in constructor", () => {
    expect(model.targetDomain).toEqual("*");
    expect(model.api).toEqual(baseIframeGameApi);
  });

  test("should return the element as iframe", () => {
    expect(model.element).toBe("iframe");
  });

  test("should return props with gameRef", () => {
    expect(model.props).toEqual(props);
  });

  test("should return lobbyUrl", () => {
    expect(model.lobbyUrl).toBe("http://localhost/");
  });

  expect(model.onMount).toBeInstanceOf(Function);
  expect(model.onUnmount).toBeInstanceOf(Function);
  expect(model.pauseGame).toBeInstanceOf(Function);
  expect(model.resumeGame).toBeInstanceOf(Function);
});
