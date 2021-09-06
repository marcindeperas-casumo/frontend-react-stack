import MESSAGES_CHANNELS from "./channels.constants";
import { DEFAULT_RUN_MODE } from "./launchGame";
import sendMessage from "./sendMessage";

const game = {
  slug: "slug",
  name: "Floor is Java",
  originalUrl: "/en/game/play",
  thumbnail: "http://casumo.com/logo.jpg",
  logo: "http://casumo.com/logo.jpg",
  gameStudio: "Mariusz Awesome Productions",
  provider: "Mariusz Awesome Productions",
};

const params = {
  id: game.slug,
  name: game.name,
  url: "",
  provider: game.provider,
  isPractice: false,
  originalUrl: game.originalUrl,
  thumbnail: game.thumbnail,
  logo: game.logo,
  runMode: DEFAULT_RUN_MODE,
  icon: game.logo,
};

function setAndroidWindow() {
  window["casumoAndroidMessaging"] = {
    launchGame: () => undefined,
  };

  window.native = {
    version: "2.40.5",
    android: true,
  };

  return jest.spyOn(window["casumoAndroidMessaging"], "launchGame");
}

function setIOSWindow() {
  window["webkit"] = {
    messageHandlers: {
      launchGame: {
        postMessage: () => undefined,
      },
    },
  };

  window.native = {
    version: "2.40.5",
    ios: true,
  };

  return jest.spyOn(window["webkit"].messageHandlers.launchGame, "postMessage");
}

jest.useFakeTimers();

describe("SendMessage function should", () => {
  beforeEach(() => {
    window.native = {
      version: "2.40.5",
    };
  });

  afterEach(() => {
    // eslint-disable-next-line fp/no-delete
    delete window.native;
    // eslint-disable-next-line fp/no-delete
    delete window["casumoAndroidMessaging"];
    // eslint-disable-next-line fp/no-delete
    delete window["webkit"];
  });

  test("invoke Android specific window's callback", () => {
    const callbackSpy = setAndroidWindow();

    sendMessage(MESSAGES_CHANNELS.LAUNCH_GAME, params, () => undefined);

    jest.runAllTimers();

    expect(callbackSpy).toHaveBeenCalledWith(JSON.stringify(params));
  });

  test("invoke iOS specific window's callback", () => {
    const callbackSpy = setIOSWindow();

    sendMessage(MESSAGES_CHANNELS.LAUNCH_GAME, params, () => undefined);

    jest.runAllTimers();

    expect(callbackSpy).toHaveBeenCalledWith(params);
  });
});
