import { KO_APP_EVENT_IGNORE_DEPOSIT_BONUSES } from "Src/constants";
import bridge from "../DurandalReactBridge";

export const ignoreDepositBonuses = () =>
  bridge.emit(KO_APP_EVENT_IGNORE_DEPOSIT_BONUSES);
