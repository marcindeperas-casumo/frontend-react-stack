// @flow

export type ActiveSessionType = {
  id: string,
  lastUpdateTime: number,
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
