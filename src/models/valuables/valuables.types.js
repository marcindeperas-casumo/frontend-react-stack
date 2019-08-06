// @flow
import {
  VALUABLE_STATES,
  VALUABLE_TYPES,
  VALUABLE_REQUIREMENT_TYPES,
} from "./valuables.constants";

export type ValuableType = $Values<typeof VALUABLE_TYPES>;
export type ValuableState = $Values<typeof VALUABLE_STATES>;
// eslint-disable-next-line prettier/prettier
export type ValuableRequirementType = $Values<typeof VALUABLE_REQUIREMENT_TYPES>;

export type DurationTranslations = {
  hours: {
    plural: string,
    singular: string,
  },
  days: {
    plural: string,
    singular: string,
  },
};

export type ValuableDetailsTranslations = DurationTranslations & {
  playNowLabel: string,
  playToUnlockLabel: string,
  depositToUnlockLabel: string,
  depositNowLabel: string,
  termsAndConditionLabel: string,
  expirationTimeLabel: string,
};
