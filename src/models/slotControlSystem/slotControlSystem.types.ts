// @flow
import { END_SESSION_REASONS } from "Models/slotControlSystem";

export type GameSessionStatsType = {
  consumedBalance: number,
  initialLimit: number,
  lastUpdateTime: number,
  remainingBalance: number,
  totalBets: number,
  totalWins: number,
  currency: string,
};

export type ActiveSessionType = {
  id: string,
  /** Unix time in millis */
  expiringTime: number,
  /** Unix time in millis */
  startedTime: number,
  durationInSecs: number,
  reminderFrequencyInSecs: number,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  postSessionExclusionInMinutes: ?number,
  stats: GameSessionStatsType,
};

export type EndedSessionType = {
  id: string,
  /** Unix time in millis */
  startedTime: number,
  /** Unix time in millis */
  endedTime: number,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
  endReason: $Values<typeof END_SESSION_REASONS>,
  stats: GameSessionStatsType,
};

export type ExclusionType = {
  id: string,
  /** Unix time in millis */
  expiringTime: number,
  /** Unix time in millis */
  startedTime: number,
};

export type StateType = {
  /** Unix time in millis */
  lastUpdateTime: number,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  activeSession: ?ActiveSessionType,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  lastEndedSession: ?EndedSessionType,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  activeExclusion: ?ExclusionType,
  // @ts-expect-error ts-migrate(1170) FIXME: A computed property name in a type literal must re... Remove this comment to see the full error message
  slugToCategoryMap: { [string]: string },
};

export type SessionStateResponseType = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  activeSession: ?ActiveSessionType,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  lastEndedSession: ?EndedSessionType,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  activeExclusion: ?ExclusionType,
};

export type NewSessionRequestType = {
  durationInSecs: number,
  reminderFrequencyInSecs: number,
  postSessionExclusionInMinutes?: number,
  limit: {
    amount: number,
    currency: string,
  },
};

export type UseSessionsStateType = {
  isFetching: boolean,
  isSynced: boolean,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  activeSession: ?ActiveSessionType,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  lastEndedSession: ?EndedSessionType,
  lastEndedSessionDuringLastHour: boolean,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  activeExclusion: ?ExclusionType,
};

export type SessionEndedCometdMessage = {
  type: string,
  data: {
    "com.casumo.es.slotsessions.notifications.SessionEndedNotification": SessionStateResponseType,
  },
};
