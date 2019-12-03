// @flow

export type ActiveSessionType = {
  id: string,
  /** Unix time in millis */
  lastUpdateTime: number,
  /** Unix time in millis */
  expiringTime: number,
  /** Unix time in millis */
  startedTime: number,
  durationInSecs: number,
  reminderFrequencyInSecs: number,
  postSessionExclusionInMinutes: ?number,
  limit: {
    amount: number,
    currency: string,
  },
};

export type EndedSessionType = {
  id: string,
  /** Unix time in millis */
  startedTime: number,
  /** Unix time in millis */
  endedTime: number,
  endReason: string,
};

export type ExclusionType = {
  id: string,
  /** Unix time in millis */
  expiringTime: number,
  /** Unix time in millis */
  startedTime: number,
};

export type StateType = {
  activeSession: ?ActiveSessionType,
  lastEndedSession: ?EndedSessionType,
  activeExclusion: ?ExclusionType,
};

export type SessionStateResponseType = {
  activeSession: ?$Diff<ActiveSessionType, { lastUpdateTime: number }>,
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
