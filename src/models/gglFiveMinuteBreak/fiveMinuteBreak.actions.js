// @flow
import type { GglRealityCheckSummary } from "./fiveMinuteBreak.types";
import { types } from "./fiveMinuteBreak.constants";

export const gglRealityCheckUpdateAction = (data: GglRealityCheckSummary) => ({
  type: types.GGL_FIVE_MINUTE_BREAK_REALITY_CHECK_UPDATE,
  ...data,
});
