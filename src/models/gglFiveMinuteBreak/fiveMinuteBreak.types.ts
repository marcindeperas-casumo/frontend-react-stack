export type GglRealityCheckInterval = {
  startedTime: number;
  expiringTime: number;
};

export type GglRealityCheckSummary = {
  activeRCSession: GglRealityCheckInterval | undefined;
  activeRCBreak: GglRealityCheckInterval | undefined;
};

export type PauseResumeGameSlugProps = {
  pauseGame: () => Promise<void>;
  resumeGame: () => void;
  gameSlug: string;
};
