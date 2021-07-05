import logger from "Services/logger";
import { ENVIRONMENTS, DEFAULT_LANGUAGE } from "Src/constants";
import { ThunderkickGame, COMMANDS } from "./ThunderkickGame";

describe("ThunderkickGame", () => {
  const gameData = {
    url:
      "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
    providerType: "THUNDERKICK_MOBILE",
    providerName: "THUNDERKICK",
  };
  const gameRef = { current: null };
  const model = new ThunderkickGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
    urlPrefix: DEFAULT_LANGUAGE,
  });

  test("should return the element as iframe", () => {
    expect(model.componentTag).toBe("iframe");
  });

  test("should set api commands", () => {
    expect(model.api.features.instantPause).toBe(true);
    expect(model.api.commands.pause).toEqual(COMMANDS.PAUSE);
    expect(model.api.commands.resume).toEqual(COMMANDS.RESUME);
  });

  describe("onMessageHandler", () => {
    test("it properly parses event data and does not log anything", () => {
      const spy = jest.spyOn(model, "parseMessageData");
      const loggerSpy = jest.spyOn(logger, "error");

      const eventData = {
        test: true,
      };
      const event = {
        data: JSON.stringify(eventData),
        origin: "test",
      };

      model.onMessageHandler(event);

      expect(spy).toHaveBeenCalledWith(event.data);
      expect(loggerSpy).not.toHaveBeenCalled();

      spy.mockRestore();
      loggerSpy.mockRestore();
    });

    test("it logs error and returns event data as is if parseMessageData throws", () => {
      const spy = jest.spyOn(model, "parseMessageData");
      const catcherSpy = jest.spyOn(model, "parseMessageDataCatcher");
      const loggerSpy = jest.spyOn(logger, "error");

      const eventData = {
        test: true,
      };
      const event = {
        data: eventData,
        origin: "test",
      };

      model.onMessageHandler(event);

      expect(spy).toHaveBeenCalledWith(event.data);
      expect(catcherSpy).toHaveReturnedWith(event.data);
      expect(loggerSpy).toHaveBeenCalledWith(
        'ThunderkickGame.onMessageHandler threw while parsing {"test":true}'
      );

      spy.mockRestore();
      catcherSpy.mockRestore();
      loggerSpy.mockRestore();
    });
  });
});
