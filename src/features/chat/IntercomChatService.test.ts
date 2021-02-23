import { injectScript, hasAlphaCharactersOnly, isTestEnv } from "Utils";
import { ENVIRONMENTS } from "Src/constants";
import { injectIntercomScript, registerPauseResumeGame, openChatWindow, } from "./IntercomChatService";
import { INTERCOM_WIDGET_URL, INTERCOM_APP_ID, IDENTITY_VERIFICATION_URL, SETTINGS, } from "./constants";
jest.mock("../../utils/utils.js", () => ({
    ...jest.requireActual("../../utils/utils.js"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    injectScript: jest.fn().mockResolvedValue(),
    hasAlphaCharactersOnly: jest.fn().mockReturnValue(false),
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
        (global as any).fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => ({ identityHash: "HMAC" }),
        });
        (window as any).Intercom = jest.fn();
    });
    afterEach(() => {
        /* eslint-disable fp/no-delete */
        delete (global as any).fetch;
        delete (window as any).Intercom;
        /* eslint-enable fp/no-delete */
    });
    describe("if disabled in native", () => {
        test("should do nothing", async () => {
            (window as any).native = { nativeIntercomEnabled: true };
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            await injectIntercomScript(mockPlayerDetails);
            expect(injectScript).not.toHaveBeenCalled();
            expect((global as any).fetch).not.toHaveBeenCalled();
            // eslint-disable-next-line fp/no-delete
            delete (window as any).native;
        });
    });
    describe("if not disabled in native", () => {
        test("should call identity verification service", async () => {
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            await injectIntercomScript(mockPlayerDetails);
            expect((global as any).fetch).toHaveBeenCalledWith(IDENTITY_VERIFICATION_URL, expect.any(Object));
        });
        test("should register 'onShow' and 'onHide' callbacks", async () => {
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            await injectIntercomScript(mockPlayerDetails);
            expect((window as any).Intercom).toHaveBeenCalledWith("onShow", expect.any(Function));
            expect((window as any).Intercom).toHaveBeenCalledWith("onHide", expect.any(Function));
        });
        test("should reverse first and last name for Japan", async () => {
            (hasAlphaCharactersOnly as any).mockReturnValue(true);
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            await injectIntercomScript(mockPlayerDetails);
            expect((window as any).Intercom).toHaveBeenCalledWith("boot", {
                ...baseExpectedSettings,
                app_id: INTERCOM_APP_ID[ENVIRONMENTS.PRODUCTION],
                name: "casumoName [Last First]",
            });
            (hasAlphaCharactersOnly as any).mockReturnValue(false);
        });
        describe("for live environment", () => {
            beforeEach(() => {
                // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
                injectIntercomScript(mockPlayerDetails);
            });
            test("should fetch live Intercom bundle", () => {
                expect(injectScript).toHaveBeenCalledWith(INTERCOM_WIDGET_URL + INTERCOM_APP_ID[ENVIRONMENTS.PRODUCTION]);
            });
            test("should use live Intercom settings", () => {
                expect((window as any).Intercom).toHaveBeenCalledWith("boot", {
                    ...baseExpectedSettings,
                    app_id: INTERCOM_APP_ID[ENVIRONMENTS.PRODUCTION],
                    name: "casumoName [First Last]",
                });
            });
        });
        describe("for test environment", () => {
            beforeEach(() => {
                (isTestEnv as any).mockReturnValue(true);
                // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
                injectIntercomScript(mockPlayerDetails);
            });
            afterEach(() => {
                (isTestEnv as any).mockReturnValue(false);
            });
            test("should fetch test Intercom bundle", () => {
                expect(injectScript).toHaveBeenCalledWith(INTERCOM_WIDGET_URL + INTERCOM_APP_ID[ENVIRONMENTS.TEST]);
            });
            test("should use test Intercom settings", () => {
                expect((window as any).Intercom).toHaveBeenCalledWith("boot", {
                    ...baseExpectedSettings,
                    app_id: INTERCOM_APP_ID[ENVIRONMENTS.TEST],
                    name: "casumoName [First Last]",
                });
            });
        });
    });
});
describe("registerPauseResumeGame", () => {
    let pauseGameCallback;
    let resumeGameCallback;
    beforeEach(() => {
        (global as any).fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => ({ identityHash: "HMAC" }),
        });
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        pauseGameCallback = jest.fn().mockResolvedValue();
        resumeGameCallback = jest.fn();
        registerPauseResumeGame(pauseGameCallback, resumeGameCallback);
        (window as any).Intercom = jest.fn().mockImplementation((evtHook, callback) => {
            if (typeof callback === "function") {
                callback();
            }
        });
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        injectIntercomScript(mockPlayerDetails);
    });
    afterEach(() => {
        /* eslint-disable fp/no-delete */
        delete (global as any).fetch;
        delete (window as any).Intercom;
        /* eslint-enable fp/no-delete */
    });
    test("should use the registered 'onShow' callback", () => {
        expect(pauseGameCallback).toHaveBeenCalled();
    });
    test("should use the registered 'onHide' callback", () => {
        expect(resumeGameCallback).toHaveBeenCalled();
    });
});
describe("openChatWindow", () => {
    beforeEach(() => {
        (window as any).Intercom = jest.fn();
    });
    afterEach(() => {
        // eslint-disable-next-line fp/no-delete
        delete (window as any).Intercom;
    });
    test("should call Intercom API to open chat", () => {
        (window as any).Intercom = jest.fn();
        openChatWindow();
        expect((window as any).Intercom).toHaveBeenCalledWith("show");
    });
});
