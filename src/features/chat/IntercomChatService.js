//@flow
import { injectScript /*, isTestEnv*/ } from "Utils";
import { ENVIRONMENTS } from "Src/constants";
import http from "Lib/http";
import {
  INTERCOM_WIDGET_URL,
  INTERCOM_APP_ID,
  IDENTITY_VERIFICATION_URL,
  SETTINGS,
} from "./constants";

const intercomAppId = INTERCOM_APP_ID[ENVIRONMENTS.TEST];
//  INTERCOM_APP_ID[isTestEnv() ? ENVIRONMENTS.TEST : ENVIRONMENTS.PRODUCTION];

const isDisabled: () => boolean = () =>
  window.native && window.native.nativeIntercomEnabled === true;

const getVerificationHash: Promise<string> = () =>
  http.get(IDENTITY_VERIFICATION_URL);

export const injectIntercomScript: () => void = () => {
  //mstrz("loading intercom");

  if (isDisabled()) {
    return;
  }

  injectScript(INTERCOM_WIDGET_URL + intercomAppId).then(() => {
    getVerificationHash().then(hmac => {
      window.Intercom("boot", {
        ...SETTINGS,
        app_id: intercomAppId,
        user_hash: hmac,
        user_id: "342e0750-ced0-11e6-b84b-005056a937aa",
        email: "marcin.strzeszkowski+uk@casumo.com",
        name: "mstrz [marcin strzezkowski]",
      });
    });
  });
};
