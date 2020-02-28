// @flow
import type { GameCategory } from "Api/api.casinoPlayerGames";
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
  postSessionExclusionInMinutes: ?number,
  stats: GameSessionStatsType,
};

export type EndedSessionType = {
  id: string,
  /** Unix time in millis */
  startedTime: number,
  /** Unix time in millis */
  endedTime: number,
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
  activeSession: ?ActiveSessionType,
  lastEndedSession: ?EndedSessionType,
  activeExclusion: ?ExclusionType,
  slugToCategoryMap: { [string]: GameCategory },
};

export type SessionStateResponseType = {
  activeSession: ?ActiveSessionType,
  lastEndedSession: ?EndedSessionType,
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
  isFresh: boolean,
  activeSession: ?ActiveSessionType,
  lastEndedSession: ?EndedSessionType,
  lastEndedSessionDuringLastHour: boolean,
  activeExclusion: ?ExclusionType,
};

export type SessionEndedCometdMessage = {
  type: string,
  data: {
    "com.casumo.es.slotsessions.notifications.SessionEndedNotification": SessionStateResponseType,
  },
};
