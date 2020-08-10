// @flow
import * as R from "ramda";
import type {
  SetLoginTimeLimitProps,
  LoginTimeLimitsFormData,
} from "Models/playOkay";

const ifNanZero: number => number = R.when(isNaN, R.always(0));

export function textInputOnChange(setter: number => void) {
  return (e: SyntheticInputEvent<HTMLInputElement>) =>
    setter(ifNanZero(parseInt(e.currentTarget.value)));
}

export function transformFormDataToRequestPayloads(
  formData: LoginTimeLimitsFormData,
  playerId: string
): Array<SetLoginTimeLimitProps> {
  return [
    {
      playerId,
      limitInMinutes: formData.hrsPerDay * 60,
      periodSetting: "Daily",
    },
    {
      playerId,
      limitInMinutes: formData.hrsPerWeek * 60,
      periodSetting: "Weekly",
    },
    {
      playerId,
      limitInMinutes: formData.hrsPerMonth * 60,
      periodSetting: "Monthly",
    },
  ];
}
