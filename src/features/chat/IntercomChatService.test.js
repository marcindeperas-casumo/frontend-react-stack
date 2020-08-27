import { injectScript, doesContainJapaneseCharacters, isTestEnv } from "Utils";
import { ENVIRONMENTS } from "Src/constants";
import { injectIntercomScript } from "./IntercomChatService";
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

describe("injectIntercomScript", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ identityHash: "HMAC" }),
    });
    window.Intercom = jest.fn();
  });
  afterAll(() => {
    /* eslint-disable fp/no-delete */
    delete global.fetch;
    delete window.Intercom;
    /* eslint-enable fp/no-delete */
  });

  test("should do nothing if disabled in native", async () => {
    window.native = { nativeIntercomEnabled: true };

    await injectIntercomScript(mockPlayerDetails);

    expect(injectScript).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  describe.skip("if not disabled in native", () => {
    test("should call identity verification service", async () => {
      await injectIntercomScript(mockPlayerDetails);

      expect(global.fetch).toHaveBeenCalledWith(IDENTITY_VERIFICATION_URL);
    });

    test("for Japan reverse first and last name", async () => {
      doesContainJapaneseCharacters.mockReturnValue(true);
      await injectIntercomScript(mockPlayerDetails);

      expect(window.Intercom).toHaveBeenCalledWith("boot", {
        ...SETTINGS,
        app_id: INTERCOM_APP_ID[ENVIRONMENTS.PRODUCTION],
        user_hash: "HMAC",
        user_id: "playerId",
        email: "email",
        name: "casumoName [Last First]",
      });
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
          ...SETTINGS,
          app_id: INTERCOM_APP_ID[ENVIRONMENTS.PRODUCTION],
          user_hash: "HMAC",
          user_id: "playerId",
          email: "email",
          name: "casumoName [First Last]",
        });
      });
    });

    describe("for test environment", () => {
      beforeEach(() => {
        isTestEnv.mockReturnValue(true);
        injectIntercomScript(mockPlayerDetails);
      });

      test("should fetch live Intercom bundle", () => {
        expect(injectScript).toHaveBeenCalledWith(
          INTERCOM_WIDGET_URL + INTERCOM_APP_ID[ENVIRONMENTS.TEST]
        );
      });

      test("should use live Intercom settings", () => {
        expect(window.Intercom).toHaveBeenCalledWith("boot", {
          ...SETTINGS,
          app_id: INTERCOM_APP_ID[ENVIRONMENTS.TEST],
          user_hash: "HMAC",
          user_id: "playerId",
          email: "email",
          name: "casumoName [First Last]",
        });
      });
    });
  });
});
