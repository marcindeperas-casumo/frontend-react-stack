// @flow
import * as R from "ramda";
import type {
  SetLoginTimeLimitProps,
  LoginTimeLimitsFormData,
} from "Models/playOkay";

// @ts-expect-error ts-migrate(2693) FIXME: 'number' only refers to a type, but is being used ... Remove this comment to see the full error message
const ifNanZero: number => number = R.when(isNaN, R.always(0));

export function textInputOnChange(setter: number => void) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'SyntheticInputEvent'.
  return (e: SyntheticInputEvent<HTMLInputElement>) =>
    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
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
