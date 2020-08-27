import { injectScript, doesContainJapaneseCharacters, isTestEnv } from "Utils";
import { ENVIRONMENTS } from "Src/constants";
import {
  injectIntercomScript,
  registerPauseResumeGame,
} from "./IntercomChatService";
import {
  INTERCOM_WIDGET_URL,
  INTERCOM_APP_ID,
  IDENTITY_VERIFICATION_URL,
  SETTINGS,
} from "./constants";

jest.mock("../../utils/utils.js", () => ({
  ...jest.requireActual("../../utils/utils.js"),
  injectScript: jest.fn().mockResolvedValue(),
  doesContainJapaneseCharacters: jest.fn().mockReturnValue(false),
  isTestEnv: jest.fn().mockReturnValue(false),
}));

const mockPlayerDetails = {
  playerId: "playerId",
  email: "email",
  casumoName: "casumoName",
  playerName: { firstName: "First", lastName: "Last" },
};

const baseExpectedSettings = {
  ...SETTINGS,
  user_hash: "HMAC",
  user_id: "playerId",
  email: "email",
};

describe("injectIntercomScript", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ identityHash: "HMAC" }),
    });
    window.Intercom = jest.fn();
  });
  afterEach(() => {
    /* eslint-disable fp/no-delete */
    delete global.fetch;
    delete window.Intercom;
    /* eslint-enable fp/no-delete */
  });

  describe("if disabled in native", () => {
    test("should do nothing", async () => {
      window.native = { nativeIntercomEnabled: true };

      await injectIntercomScript(mockPlayerDetails);

      expect(injectScript).not.toHaveBeenCalled();
      expect(global.fetch).not.toHaveBeenCalled();

      // eslint-disable-next-line fp/no-delete
      delete window.native;
    });
  });

  describe("if not disabled in native", () => {
    test("should call identity verification service", async () => {
      await injectIntercomScript(mockPlayerDetails);

      expect(global.fetch).toHaveBeenCalledWith(
        IDENTITY_VERIFICATION_URL,
        expect.any(Object)
      );
    });

    test("should register 'onShow' and 'onHide' callbacks", async () => {
      await injectIntercomScript(mockPlayerDetails);

      expect(window.Intercom).toHaveBeenCalledWith(
        "onShow",
        expect.any(Function)
      );
      expect(window.Intercom).toHaveBeenCalledWith(
        "onHide",
        expect.any(Function)
      );
    });

    test("should reverse first and last name for Japan", async () => {
      doesContainJapaneseCharacters.mockReturnValue(true);
      await injectIntercomScript(mockPlayerDetails);

      expect(window.Intercom).toHaveBeenCalledWith("boot", {
        ...baseExpectedSettings,
        app_id: INTERCOM_APP_ID[ENVIRONMENTS.PRODUCTION],
        name: "casumoName [Last First]",
      });
      doesContainJapaneseCharacters.mockReturnValue(false);
    });

    describe("for live environment", () => {
      beforeEach(() => {
        injectIntercomScript(mockPlayerDetails);
      });

      test("should fetch live Intercom bundle", () => {
        expect(injectScript).toHaveBeenCalledWith(
          INTERCOM_WIDGET_URL + INTERCOM_APP_ID[ENVIRONMENTS.PRODUCTION]
        );
      });

      test("should use live Intercom settings", () => {
        expect(window.Intercom).toHaveBeenCalledWith("boot", {
          ...baseExpectedSettings,
          app_id: INTERCOM_APP_ID[ENVIRONMENTS.PRODUCTION],
          name: "casumoName [First Last]",
        });
      });
    });

    describe("for test environment", () => {
      beforeEach(() => {
        isTestEnv.mockReturnValue(true);
        injectIntercomScript(mockPlayerDetails);
      });
      afterEach(() => {
        isTestEnv.mockReturnValue(false);
      });

      test("should fetch live Intercom bundle", () => {
        expect(injectScript).toHaveBeenCalledWith(
          INTERCOM_WIDGET_URL + INTERCOM_APP_ID[ENVIRONMENTS.TEST]
        );
      });

      test("should use live Intercom settings", () => {
        expect(window.Intercom).toHaveBeenCalledWith("boot", {
          ...baseExpectedSettings,
          app_id: INTERCOM_APP_ID[ENVIRONMENTS.TEST],
          name: "casumoName [First Last]",
        });
      });
    });

    describe("if has callbacks registered", () => {
      let pauseGameCallback;
      let resumeGameCallback;

      beforeEach(() => {
        pauseGameCallback = jest.fn().mockResolvedValue();
        resumeGameCallback = jest.fn();

        registerPauseResumeGame(pauseGameCallback, resumeGameCallback);

        window.Intercom = jest.fn().mockImplementation((evtHook, callback) => {
          if (typeof callback === "function") {
            callback();
          }
        });

        injectIntercomScript(mockPlayerDetails);
      });

      test("should use the registered 'onShow' callback", () => {
        expect(pauseGameCallback).toHaveBeenCalled();
      });

      test("should use the registered 'onHide' callback", () => {
        expect(resumeGameCallback).toHaveBeenCalled();
      });
    });
  });
});
