// @flow
export type GglRealityCheckInterval = {
  startedTime: number,
  expiringTime: number,
};

export type GglRealityCheckSummary = {
  activeRCSession: ?GglRealityCheckInterval,
  activeRCBreak: ?GglRealityCheckInterval,
};

export type PauseResumeGameSlugProps = {
  pauseGame: () => Promise<void>,
  resumeGame: () => void,
  gameSlug: string,
};
