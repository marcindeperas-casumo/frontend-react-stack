// @flow
import { VALUABLE_STATES, VALUABLE_TYPES } from "./valuables.constants";

export type ValuableType = $Values<typeof VALUABLE_TYPES>;
export type ValuableState = $Values<typeof VALUABLE_STATES>;
