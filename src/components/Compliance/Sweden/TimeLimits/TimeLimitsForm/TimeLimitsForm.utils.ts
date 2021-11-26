import * as R from "ramda";
import type {
  TLoginTimeLimitsFormData,
  TPeriod,
  TRevokeLoginTimeLimitArgs,
  TUpdateLoginTimeLimitArgs,
} from "Models/playOkay";
import { limitPeriod } from "Models/playOkay";

export function textInputOnChange(setter: (n: number) => void) {
  return (e: React.ChangeEvent<HTMLInputElement>) =>
    setter(ifNanZero(parseInt(e.currentTarget.value)));
}

export function transformFormDataToRequestPayloads(
  formData: TLoginTimeLimitsFormData,
  playerId: string
): Array<TUpdateLoginTimeLimitArgs | TRevokeLoginTimeLimitArgs> {
  return [
    prepareRequestPayload({
      hours: formData.hrsPerDay,
      haveChanged: formData.hrsPerDayChanged,
      playerId,
      periodSetting: limitPeriod.DAILY,
    }),
    prepareRequestPayload({
      hours: formData.hrsPerWeek,
      haveChanged: formData.hrsPerWeekChanged,
      playerId,
      periodSetting: limitPeriod.WEEKLY,
    }),
    prepareRequestPayload({
      hours: formData.hrsPerMonth,
      haveChanged: formData.hrsPerMonthChanged,
      playerId,
      periodSetting: limitPeriod.MONTHLY,
    }),
  ].filter(Boolean);
}

const ifNanZero: (n: number) => number = R.when(isNaN, R.always(null));

type TPrepareRequestPayloadArgs = {
  playerId: string;
  hours: number | null;
  haveChanged: boolean;
  periodSetting: TPeriod;
};

function prepareRequestPayload({
  playerId,
  periodSetting,
  hours,
  haveChanged,
}: TPrepareRequestPayloadArgs):
  | TUpdateLoginTimeLimitArgs
  | TRevokeLoginTimeLimitArgs
  | null {
  if (!haveChanged) {
    return null;
  }

  if (hours === null) {
    return {
      playerId,
      periodSetting,
    };
  }

  return {
    playerId,
    periodSetting,
    limitInMinutes: hours * 60,
  };
}
