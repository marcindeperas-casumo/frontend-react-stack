// @flow

export type GameplayStatsType = {
  currency: string,
  consumedBalance: number,
  remainingBalance: number,
  initialLimit: number,
  totalBets: number,
  totalWins: number,
  lastUpdateTime: ?number,
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
  stats: GameplayStatsType,
};

export type EndedSessionType = {
  id: string,
  /** Unix time in millis */
  startedTime: number,
  /** Unix time in millis */
  endedTime: number,
  endReason: string,
  stats: GameplayStatsType,
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
    "com.casumo.es.slotsessions.notifications.SessionEndedNotification": EndedSessionType,
  },
};
