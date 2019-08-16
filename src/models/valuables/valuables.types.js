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
  hour_singular: string,
  hour_plural: string,
  day_singular: string,
  day_plural: string,
};

export type ValuableDetailsTranslations = DurationTranslations & {
  playNowLabel: string,
  playToUnlockLabel: string,
  depositToUnlockLabel: string,
  depositNowLabel: string,
  termsAndConditionLabel: string,
  expirationTimeLabel: string,
  termsAndConditionContent: string,
};

export type ValuableDetailsProps = {
  id: string,
  /* Url of the background image to be used in the header */
  backgroundImage: string,
  /* Detailed description of the Valuable */
  content: string,
  /* Caveat for the valuable */
  caveat?: string,
  /* Hours left for the bonus to expire */
  expirationTimeInHours: number,
  /* Requirement type to unlock */
  requirementType?: ValuableRequirementType,
  /* Type of Valuable */
  valuableType: ValuableType,
  /* The valuable's current state */
  valuableState: ValuableState,
};
