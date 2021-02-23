// @flow
import * as A from "Types/apollo";
import {
  VALUABLE_STATES,
  VALUABLE_TYPES,
  VALUABLE_REQUIREMENT_TYPES,
} from "./valuables.constants";

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
export type ValuableType = $Values<typeof VALUABLE_TYPES>;
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
export type ValuableState = $Values<typeof VALUABLE_STATES>;
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
// eslint-disable-next-line prettier/prettier
export type ValuableRequirementType = $Values<typeof VALUABLE_REQUIREMENT_TYPES>;

export type DurationTranslations = {
  hour_singular: string,
  hour_plural: string,
  day_singular: string,
  day_plural: string,
};

export type ValuableThumbnailTranslations = {
  usedListTitleLabel: string,
  lockedListTitleLabel: string,
  hoursLabel: string,
  minutesLabel: string,
};

export type ValuableDetailsTranslations = DurationTranslations & {
  activateCashbackActionLabel: string,
  cashUnlockedActionLabel: string,
  spinsUnlockedActionLabel: string,
  playToUnlockLabel: string,
  playNowLabel: string,
  depositToUnlockLabel: string,
  depositNowLabel: string,
  termsAndConditionLabel: string,
  expirationTimeLabel: string,
  termsAndConditionsContent: string,
  wageringStatus: string,
};

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
  dontUseValuableLabel: string,
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
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  onConsumeValuable: string => Promise<void>,
  /** The function to be called on click of a valuable row item */
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'onItemClick'.
  onItemClick?: string => void,
  /** Icon to be used as selector */
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'valuableSelector'.
  valuableSelector?: Node,
  /** Allows a valuable item to be selectable */
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'isItemSelectable'.
  isItemSelectable: boolean,
  /** An array of translated labels */
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'translations'.
  translations: ValuableListTranslations,
};
