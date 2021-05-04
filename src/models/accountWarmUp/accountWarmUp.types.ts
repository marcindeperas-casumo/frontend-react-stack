export type TGetDetailsProps = {
  playerId: string;
};

export type TPlayerWarmUpDetailsResponse = {
  playerId: string;
  inWarmupPhase: boolean;
  warmupTimeEnd: string;
  verified: boolean;
};
