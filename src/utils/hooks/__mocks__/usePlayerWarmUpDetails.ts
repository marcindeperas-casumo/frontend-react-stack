// import type { UseLoginSessionSummary } from "../useLoginSessionSummary";

const details = {
  playerId: "1",
  inWarmupPhase: false,
  warmupTimeEnd: "123",
  verified: true,
};

export function usePlayerWarmUpDetails() {
  return {
    fetchDetailsAsync: () => Promise.resolve(details),
    fetchDetails: () => details,
    loading: false,
    details: {
      playerId: "1",
      inWarmupPhase: false,
      warmupTimeEnd: "123",
      verified: true,
    }
  };
}