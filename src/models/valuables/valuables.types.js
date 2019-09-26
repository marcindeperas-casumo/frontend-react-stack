// @flow
import type { Game } from "Types/game";
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

export type ValuableThumbnailTranslations = {
  hoursLabel: string,
  minutesLabel: string,
};

export type ValuableDetailsTranslations = DurationTranslations & {
  cashUnLockedActionLabel: string,
  spinsUnLockedActionLabel: string,
  playToUnlockLabel: string,
  depositToUnlockLabel: string,
  depositNowLabel: string,
  termsAndConditionLabel: string,
  expirationTimeLabel: string,
  termsAndConditionsContent: string,
  wageringStatus: string,
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
  requirementType: ?ValuableRequirementType,
  /*Game to launch on click of button */
  game?: Game,
  /* Type of Valuable */
  valuableType: ValuableType,
  /* The valuable's current state */
  valuableState: ValuableState,
  /** The function to be called to consume the valuable which will be triggered by each card click */
  onConsumeValuable: string => Promise<boolean>,
  /** The function to be called to launch game which will be triggered after consuming the valuable */
  onLaunchGame: string => void,
};

export type DurationProps = {
  hours: number,
  minutes: number,
  seconds: number,
};
