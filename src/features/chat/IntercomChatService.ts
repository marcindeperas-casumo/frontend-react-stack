//@flow
import logger from "Services/logger";
import { injectScript, hasAlphaCharactersOnly, isTestEnv } from "Utils";
import { ENVIRONMENTS } from "Src/constants";
import http from "Lib/http";
import { INTERCOM_WIDGET_URL, INTERCOM_APP_ID, IDENTITY_VERIFICATION_URL, SETTINGS, } from "./constants";
const isDisabled: () => boolean = () => (window as any).native && (window as any).native.nativeIntercomEnabled === true;
const getVerificationHash: () => Promise<{
    identityHash: string;
}> = () => http.get(IDENTITY_VERIFICATION_URL);
const gameControlApi = {};
export type IntercomPlayerDetailsProps = {
    playerId: string;
    email: string;
    casumoName: string;
    playerName: {
        firstName: string;
        lastName: string;
    };
};
export const registerPauseResumeGame: (pauseGame: () => Promise<void>, resumeGame: () => void) => void = (pauseGame, resumeGame) => {
    /* eslint-disable fp/no-mutation */
    (gameControlApi as any).pauseGame = pauseGame;
    (gameControlApi as any).resumeGame = resumeGame;
    /* eslint-enable fp/no-mutation */
};
export const injectIntercomScript: IntercomPlayerDetailsProps;
// @ts-expect-error ts-migrate(2348) FIXME: Value of type 'PromiseConstructor' is not callable... Remove this comment to see the full error message
Promise < void  > ;
({ playerId, email, casumoName, playerName, }) => {
    if (isDisabled()) {
        return Promise.resolve();
    }
    const intercomAppId = INTERCOM_APP_ID[isTestEnv() ? ENVIRONMENTS.TEST : ENVIRONMENTS.PRODUCTION];
    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
    const fullName = hasAlphaCharactersOnly(playerName.firstName)
        ? `${playerName.lastName} ${playerName.firstName}`
        : `${playerName.firstName} ${playerName.lastName}`;
    return injectScript(INTERCOM_WIDGET_URL + intercomAppId)
        .then(() => getVerificationHash()
        .then(({ identityHash }) => {
        const settings = {
            ...SETTINGS,
            app_id: intercomAppId,
            user_hash: identityHash,
            user_id: playerId,
            email,
            name: `${casumoName} [${fullName}]`,
        };
        (window as any).Intercom("boot", settings);
        (window as any).Intercom("onShow", () => {
            (gameControlApi as any).pauseGame && (gameControlApi as any).pauseGame();
        });
        (window as any).Intercom("onHide", () => {
            (gameControlApi as any).resumeGame && (gameControlApi as any).resumeGame();
        });
    })
        .catch(e => {
        logger.error("[INTERCOM] Error getting identity verification", e);
    }))
        .catch(e => {
        logger.error("[INTERCOM] Error injecting script", e);
    });
};
export const openChatWindow: () => void = () => {
    (window as any).Intercom && (window as any).Intercom("show");
};
