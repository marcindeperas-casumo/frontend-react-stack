// @flow
export { DATA_STRUCTURE } from "./ComponentQueue.types";
export { ACTION_TYPES as QUEUE_ACTION_TYPES } from "./ComponentQueue.actions";
export type { TQueueAction } from "./ComponentQueue.actions";
export type {
  TComponentQueueHookState,
  TComponentQueueContent,
  TComponentQueueConfigSettings,
  TComponentQueueParameters,
} from "./ComponentQueue.types";
export { useComponentQueueState } from "./ComponentQueue.hooks";
export { queueReducer } from "./ComponentQueue.reducer";
