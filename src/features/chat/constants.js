import { ENVIRONMENTS } from "Src/constants";

export const INTERCOM_APP_ID = {
  [ENVIRONMENTS.PRODUCTION]: "rhodywdh",
  [ENVIRONMENTS.TEST]: "f8c2lsbp",
};

export const IDENTITY_VERIFICATION_URL =
  "/player/intercom-chat/api/v1/identity-hash/";

export const INTERCOM_WIDGET_URL = "https://widget.intercom.io/widget/";

export const SETTINGS = {
  hide_default_launcher: true,
};
