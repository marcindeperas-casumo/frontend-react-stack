import type { TPeriod } from "../playOkay.types";

export type TLoginTimeLimitsFormData = {
  hrsPerDay: number;
  hrsPerDayChanged: boolean;
  hrsPerWeek: number;
  hrsPerWeekChanged: boolean;
  hrsPerMonth: number;
  hrsPerMonthChanged: boolean;
};

export type TComingLimit = {
  activationTime: number;
  automaticRevocation: boolean;
  waitingForConfirmation: boolean;
  /**
   * ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  limit: string;
};

export type TComingRevocation = {
  revocationTime: number;
  automaticRevocation: boolean;
  waitingForConfirmation: boolean;
};

export type TLoginTimeLimit = {
  comingLimit: TComingLimit | null;
  comingRevocation: TComingRevocation | null;
  /**
   * ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  consumedTime: string;
  consumedTimeTimestamp: number;
  /**
   * ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  limit: string;
  period: TPeriod;
  scheduledEndTime: number;
};
