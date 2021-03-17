import { createReducer } from "Utils";
import { types } from "./fiveMinuteBreak.constants";
import type { GglRealityCheckSummary } from "./fiveMinuteBreak.types";

const DEFAULT_STATE: GglRealityCheckSummary = {
  activeRCSession: null,
  activeRCBreak: null,
};

const handlers = {
  [types.GGL_FIVE_MINUTE_BREAK_REALITY_CHECK_UPDATE]: (
    prevState: GglRealityCheckSummary,
    { activeRCSession, activeRCBreak }: GglRealityCheckSummary
  ) => ({
    ...prevState,
    activeRCSession,
    activeRCBreak,
  }),
};

export const fiveMinuteBreakReducer = createReducer<GglRealityCheckSummary>(
  DEFAULT_STATE,
  handlers
);
