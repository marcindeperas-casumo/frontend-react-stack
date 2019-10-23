// @flow

export type ActiveSessionType = {
  id: string,
};

export type StateType = {
  activeSession: ?ActiveSessionType,
  /** Timestamp */
  updatedAt: ?number,
};
