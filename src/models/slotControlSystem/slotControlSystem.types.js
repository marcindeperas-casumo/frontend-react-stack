// @flow

export type NewSessionRequestType = {
  durationInSecs: number,
  reminderFrequencyInSecs: number,
  postSessionExclusionInMinutes: ?number,
  limit: {
    amount: number,
    currency: string,
  },
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
  endTime: number,
};

export type ExclusionType = {
  id: string,
  expiryTime: number,
};

export type StateType = {
  activeSession: ?ActiveSessionType,
  endedSession: ?EndedSessionType,
  activeExclusion: ?ExclusionType,
};
