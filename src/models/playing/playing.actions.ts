// @flow
import { types } from "./playing.constants";
import type { Playing } from "./playing.types";

export const playingAction = (data: Playing) => ({
  type: types.PLAYING,
  ...data,
});
