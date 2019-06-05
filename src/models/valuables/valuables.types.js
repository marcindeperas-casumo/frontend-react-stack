// @flow
import { VALUABLE_STATES, VALUABLE_TYPES } from "./valuables.constants";

export type ValuableType = $Values<typeof VALUABLE_TYPES>; // to be replaced with graphql types
export type ValuableState = $Values<typeof VALUABLE_STATES>; // to be replaced with graphql types
