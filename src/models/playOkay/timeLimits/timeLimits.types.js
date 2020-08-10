// @flow
import { type Period } from "../playOkay.types";

export type SetLoginTimeLimitProps = {
  playerId: string,
  limitInMinutes: number,
  periodSetting: Period,
};

export type LoginTimeLimitsFormData = {
  hrsPerDay: number,
  hrsPerWeek: number,
  hrsPerMonth: number,
};

export type ComingLoginTimeLimit = {
  activationTime: number,
  automaticRevocation: boolean,
  waitingForConfirmation: boolean,
  /**
   * ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  limit: string,
};

export type LoginTimeLimit = {
  comingLimit: ?ComingLoginTimeLimit,
  comingRevocation: any,
  /**
   * ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  consumedTime: string,
  consumedTimeTimestamp: number,
  /**
   * ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  limit: string,
  period: Period,
  scheduledEndTime: number,
};
