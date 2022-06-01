import logger from "Services/logger";
import { ENVIRONMENTS, DEFAULT_LANGUAGE } from "Src/constants";
import { SkyWindGame } from "./SkyWindGame";

describe("SkyWindGame", () => {
  let model;

  beforeAll(() => {
    const gameData = {
      url: "https://edu004-p.edictmaltaservices.com.mt/gamesta…umo-mt&gameKey=adp_blackhole&gameMode=fun&lang=en",
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
    let spy;
    let catcherSpy;
    let loggerSpy;

    beforeEach(() => {
      spy = jest.spyOn(model, "parseMessageData");
      catcherSpy = jest.spyOn(model, "parseMessageDataCatcher");
      loggerSpy = jest.spyOn(logger, "error");
    });

    afterEach(() => {
      spy.mockRestore();
      loggerSpy.mockRestore();
      catcherSpy.mockRestore();
    });

    test("it properly parses event data and does not log anything", () => {
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
    });

    test("it logs error and returns event data as is if parseMessageData throws", () => {
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
    });
  });
});
