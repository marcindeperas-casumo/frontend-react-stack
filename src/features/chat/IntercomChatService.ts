import logger from "Services/logger";
import { injectScript, hasAlphaCharactersOnly, isTestEnv } from "Utils";
import { ENVIRONMENTS } from "Src/constants";
import http from "Lib/http";
import {
  INTERCOM_WIDGET_URL,
  INTERCOM_APP_ID,
  IDENTITY_VERIFICATION_URL,
  SETTINGS,
} from "./constants";

const isDisabled: () => boolean = () =>
  window.native && window.native.nativeIntercomEnabled === true;

const getVerificationHash: () => Promise<{ identityHash: string }> = () =>
  http.get(IDENTITY_VERIFICATION_URL);

const gameControlApi = {
  pauseGame: null,
  resumeGame: null,
};

export type IntercomPlayerDetailsProps = {
  playerId: string;
  email: string;
  casumoName: string;
  playerName: { firstName: string; lastName: string };
};

export const registerPauseResumeGame: (
  pauseGame: () => Promise<void>,
  resumeGame: () => void
) => void = (pauseGame, resumeGame) => {
  /* eslint-disable fp/no-mutation */
  gameControlApi.pauseGame = pauseGame;
  gameControlApi.resumeGame = resumeGame;
  /* eslint-enable fp/no-mutation */
};

export const injectIntercomScript = ({
  playerId,
  email,
  casumoName,
  playerName,
}: IntercomPlayerDetailsProps) => {
  if (isDisabled()) {
    return Promise.resolve();
  }

  const intercomAppId =
    INTERCOM_APP_ID[isTestEnv() ? ENVIRONMENTS.TEST : ENVIRONMENTS.PRODUCTION];
  const fullName = hasAlphaCharactersOnly(playerName.firstName)
    ? `${playerName.lastName} ${playerName.firstName}`
    : `${playerName.firstName} ${playerName.lastName}`;

  return injectScript(INTERCOM_WIDGET_URL + intercomAppId)
    .then(() =>
      getVerificationHash()
        .then(({ identityHash }) => {
          const settings = {
            ...SETTINGS,
            app_id: intercomAppId,
            user_hash: identityHash,
            user_id: playerId,
            email,
            name: `${casumoName} [${fullName}]`,
          };

          window.Intercom("boot", settings);
          window.Intercom("onShow", () => {
            if (gameControlApi.pauseGame) {
              gameControlApi.pauseGame();
            }
          });
          window.Intercom("onHide", () => {
            if (gameControlApi.resumeGame) {
              gameControlApi.resumeGame();
            }
          });
        })
        .catch(e => {
          logger.error("[INTERCOM] Error getting identity verification", e);
        })
    )
    .catch(e => {
      logger.error("[INTERCOM] Error injecting script", e);
    });
};

export const openChatWindow: () => void = () => {
  if (window.Intercom) {
    window.Intercom("show");
  }
};
