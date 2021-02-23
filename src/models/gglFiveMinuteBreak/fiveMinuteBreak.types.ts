// @flow
export type GglRealityCheckInterval = {
  startedTime: number,
  expiringTime: number,
};

export type GglRealityCheckSummary = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  activeRCSession: ?GglRealityCheckInterval,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  activeRCBreak: ?GglRealityCheckInterval,
};

export type PauseResumeGameSlugProps = {
  pauseGame: () => Promise<void>,
  resumeGame: () => void,
  gameSlug: string,
};
