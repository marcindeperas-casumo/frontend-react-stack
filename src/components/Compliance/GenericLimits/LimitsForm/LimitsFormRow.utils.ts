import * as R from "ramda";
import { TPeriod, TPlayOkaySettingsTranslations } from "Models/playOkay";
import { TLimitGroup } from "Models/playOkay/config/config.types";

type TProps = {
  errorMessage?: string | null;
  limitGroup: TLimitGroup;
  period: TPeriod;
  t?: TPlayOkaySettingsTranslations;
};

export function helperText({ errorMessage, limitGroup, period, t }: TProps) {
  const isMoneyLimitGroup = limitGroup.startsWith("money/");

  return R.cond([
    [
      () => !R.isNil(errorMessage) && !R.isEmpty(errorMessage),
      R.always(errorMessage),
    ],
    [
      () =>
        isMoneyLimitGroup ||
        ["LoginBlockStart", "LoginBlockEnd"].includes(period),
      R.always(t?.[`form_input_helper_${period.toLowerCase()}`]),
    ],
    [
      () => limitGroup === "time/LoginTimeLimit",
      R.always(t?.[`form_input_helper_hours_${period.toLowerCase()}`]),
    ],
    [R.T, R.always("")],
  ])();
}
