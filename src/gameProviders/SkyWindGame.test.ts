import logger from "Services/logger";
import { ENVIRONMENTS, DEFAULT_LANGUAGE } from "Src/constants";
import { SkyWindGame } from "./SkyWindGame";

describe("SkyWindGame", () => {
  let model;

  beforeAll(() => {
    const gameData = {
      url:
        "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
      providerType: "SKYWIND",
      providerName: "SKYWIND",
    };
    const gameRef = { current: null };
    model = new SkyWindGame({
      gameData,
      gameRef,
      language: DEFAULT_LANGUAGE,
      environment: ENVIRONMENTS.TEST,
      urlPrefix: DEFAULT_LANGUAGE,
    });
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
        'SkyWindGame.onMessageHandler threw while parsing {"test":true}'
      );

      spy.mockRestore();
      catcherSpy.mockRestore();
      loggerSpy.mockRestore();
    });
  });
});
