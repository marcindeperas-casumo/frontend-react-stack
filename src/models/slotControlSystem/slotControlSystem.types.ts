import { END_SESSION_REASONS } from "Models/slotControlSystem";
import { TCurrencyCode } from "Src/constants";

export type GameSessionStatsType = {
  consumedBalance: number;
  initialLimit: number;
  lastUpdateTime: number;
  remainingBalance: number;
  totalBets: number;
  totalWins: number;
  currency: TCurrencyCode;
};

export type ActiveSessionType = {
  id: string;
  /** Unix time in millis */
  expiringTime: number;
  /** Unix time in millis */
  startedTime: number;
  durationInSecs: number;
  reminderFrequencyInSecs: number;
  postSessionExclusionInMinutes: number | undefined;
  stats: GameSessionStatsType;
};

export type EndedSessionType = {
  id: string;
  /** Unix time in millis */
  startedTime: number;
  /** Unix time in millis */
  endedTime: number;
  endReason: ValueOf<typeof END_SESSION_REASONS>;
  stats: GameSessionStatsType;
};

export type ExclusionType = {
  id: string;
  /** Unix time in millis */
  expiringTime: number;
  /** Unix time in millis */
  startedTime: number;
};

export type StateType = {
  /** Unix time in millis */
  lastUpdateTime: number;
  activeSession: ActiveSessionType | undefined;
  lastEndedSession: EndedSessionType | undefined;
  activeExclusion: ExclusionType | undefined;
  slugToCategoryMap: { [s: string]: string };
};

export type SessionStateResponseType = {
  activeSession: ActiveSessionType | undefined;
  lastEndedSession: EndedSessionType | undefined;
  activeExclusion: ExclusionType | undefined;
};

export type NewSessionRequestType = {
  durationInSecs: number;
  reminderFrequencyInSecs: number;
  postSessionExclusionInMinutes?: number;
  limit: {
    amount: number;
    currency: string;
  };
};

export type UseSessionsStateType = {
  isFetching: boolean;
  isSynced: boolean;
  activeSession: ActiveSessionType | undefined;
  lastEndedSession: EndedSessionType | undefined;
  lastEndedSessionDuringLastHour: boolean;
  activeExclusion: ExclusionType | undefined;
};

export type SessionEndedCometdMessage = {
  type: string;
  data: {
    "com.casumo.es.slotsessions.notifications.SessionEndedNotification": SessionStateResponseType;
  };
};
