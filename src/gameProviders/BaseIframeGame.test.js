// @flow
import { ENVIRONMENTS } from "Src/constants";
import { DEFAULT_LANGUAGE } from "Models/handshake";
import { BaseIframeGame } from "./BaseIframeGame";

export const baseIframeGameApi = {
  commands: {
    pause: null,
    resume: null,
  },
  events: {
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
  id: "casumo-game",
  scrolling: "no",
};

describe("BaseIframeGame", () => {
  const gameData = {
    url:
      "https://d1k6j4zyghhevb.cloudfront.net/casino/launc…&partnerid=11&moneymode=fun&lang=en___&login=demo",
    providerType: "RELAX_HTML5",
    providerName: "RELAX",
  };
  const props = {
    ...baseIframeGameProps,
    src: gameData.url,
  };
  const gameRef = { current: null };
  const model = new BaseIframeGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
  });

  test("should set gameData params and gameRef in constructor", () => {
    expect(model.targetDomain).toEqual("https://d1k6j4zyghhevb.cloudfront.net");
    expect(model.api).toEqual(baseIframeGameApi);
  });

  test("should return the element as iframe", () => {
    expect(model.componentTag).toBe("iframe");
  });

  test("should return props with gameRef", () => {
    expect(model.componentProps).toEqual(props);
  });

  test("should return lobbyUrl", () => {
    expect(model.lobbyUrl).toBe(
      "http://localhost/react-stack/navigation-bubbler.html?target=en/games/top"
    );
  });

  expect(model.onMount).toBeInstanceOf(Function);
  expect(model.onUnmount).toBeInstanceOf(Function);
  expect(model.pauseGame).toBeInstanceOf(Function);
  expect(model.resumeGame).toBeInstanceOf(Function);

  test("parseMessageData should return data unaltered", () => {
    const messageData = "SOME_MESSAGE";
    const parsedData = model.parseMessageData(messageData);

    expect(parsedData).toBe(messageData);
  });

  test("extractEventId should return original data as identifier", () => {
    const messageData = "SOME_MESSAGE";
    const eventIdentifier = model.extractEventId(messageData);

    expect(eventIdentifier).toBe(messageData);
  });
});
