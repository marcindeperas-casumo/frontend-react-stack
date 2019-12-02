// @flow
import { KO_APP_EVENT_SHOW_BONUS_TERMS } from "Src/constants";
import bridge from "../DurandalReactBridge";

export const launchBonusTermsDialog = () =>
  bridge.emit(KO_APP_EVENT_SHOW_BONUS_TERMS);
