// @flow
import * as A from "Types/apollo";
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
  cashUnlockedActionLabel: string,
  spinsUnlockedActionLabel: string,
  playToUnlockLabel: string,
  depositToUnlockLabel: string,
  depositNowLabel: string,
  termsAndConditionLabel: string,
  expirationTimeLabel: string,
  termsAndConditionsContent: string,
  wageringStatus: string,
};

// export type ValuableDetailsProps = {
//   id: string,
//   /* Url of the background image to be used in the header */
//   backgroundImage: string,
//   /* Detailed description of the Valuable */
//   content: string,
//   /* Caveat for the valuable */
//   caveat?: string,
//   /* Hours left for the bonus to expire */
//   expirationTimeInHours: number,
//   /* Requirement type to unlock */
//   requirementType: ?ValuableRequirementType,
//   /*Game to launch on click of button */
//   game?: Game,
//   /* Type of Valuable */
//   valuableType: ValuableType,
//   /* The valuable's current state */
//   valuableState: ValuableState,
//   /** The function to be called to consume the valuable which will be triggered by each card click */
//   onConsumeValuable: string => Promise<boolean>,
// };

export type ValuableActionProps = {
  text: string,
  isDepositBonusSelected: boolean,
  url?: string,
};

export type DurationProps = {
  hours: number,
  minutes: number,
  seconds: number,
};

type ValuableListTranslations = ValuableThumbnailTranslations & {
  listTitleLabel: string,
  availableListTitleLabel: string,
  lockedListTitleLabel: string,
  seeAllLabel: string,
  noValuablesLabel: string,
};

export type ValuableListProps = {
  className?: string,
  /** Error message to be log in case of error*/
  error?: string,
  /** Indicates whether the data has loaded or still being retrieved */
  loading: boolean,
  /** Text as header */
  title?: string,
  /** Refetch valuables function */
  refetch?: () => void,
  /** The list of valuables to be displayed as cards */
  valuables: Array<A.PlayerValuableList_PlayerValuable>,
  /** The function to be called to consume the valuable which will be triggered by each card click */
  onConsumeValuable: string => Promise<void>,
  /** An array of translated labels */
  translations: ValuableListTranslations,
};
