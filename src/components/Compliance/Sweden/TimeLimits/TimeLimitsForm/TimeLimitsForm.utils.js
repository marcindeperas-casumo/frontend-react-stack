// @flow
import type {
  SetLoginTimeLimitProps,
  LoginTimeLimitsFormData,
} from "Models/playOkay";

export function textInputOnChange(setter: number => void) {
  return (e: SyntheticInputEvent<HTMLInputElement>) =>
    setter(Number(e.currentTarget.value));
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
