// @flow

export type NewSessionRequestType = {
  durationInSecs: number,
  reminderFrequencyInSecs: number,
  postSessionExclusionInMinutes?: number,
  limit: {
    amount: number,
    currency: string,
  },
};

export type SessionStateResponseType = {
  activeSession: ?$Diff<ActiveSessionType, { lastUpdateTime: number }>,
  lastEndedSession: ?EndedSessionType,
};

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
  expiryTime: number,
};

export type StateType = {
  activeSession: ?ActiveSessionType,
  lastEndedSession: ?EndedSessionType,
  activeExclusion: ?ExclusionType,
};
