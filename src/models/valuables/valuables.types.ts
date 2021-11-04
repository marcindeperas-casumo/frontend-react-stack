import * as React from "react";
import * as A from "Types/apollo";

export type ValuableType = A.ValuableType;
export type ValuableState = A.PlayerValuableState;
export type ValuableRequirementType = A.RequirementType;

export type ValuableListParameters = {
  valuableType?: ValuableType;
  badgeRuleName?: string;
};

export type DurationTranslations = {
  hour_singular: string;
  hour_plural: string;
  day_singular: string;
  day_plural: string;
};

export type ValuableThumbnailTranslations = {
  usedListTitleLabel: string;
  lockedListTitleLabel: string;
  hoursLabel: string;
  minutesLabel: string;
};

export type ValuableDetailsTranslations = DurationTranslations & {
  activateCashbackActionLabel: string;
  cashUnlockedActionLabel: string;
  spinsUnlockedActionLabel: string;
  playToUnlockLabel: string;
  playNowLabel: string;
  depositToUnlockLabel: string;
  depositNowLabel: string;
  termsAndConditionLabel: string;
  expirationTimeLabel: string;
  termsAndConditionsTitle: string;
  generalTermsAndConditionsTitle: string;
  marketSpecificTermsAndConditionsTitle?: string | undefined;
  termsAndConditionsContent: string;
  generalTermsAndConditionsContent: string;
  marketSpecificTermsAndConditionsContent?: string | undefined;
  wageringStatus: string;
};

export type ValuableActionProps = {
  text: string;
  isDepositBonusSelected: boolean;
  url?: string;
};

export type DurationProps = {
  hours: number;
  minutes: number;
  seconds: number;
};

type ValuableListTranslations = ValuableThumbnailTranslations & {
  listTitleLabel: string;
  availableListTitleLabel: string;
  lockedListTitleLabel: string;
  seeAllLabel: string;
  noValuablesLabel: string;
  dontUseValuableLabel: string;
};

export type ValuableListProps = {
  className?: string;
  /** Error message to be log in case of error*/
  error?: string;
  /** Indicates whether the data has loaded or still being retrieved */
  loading: boolean;
  /** Text as header */
  title?: string;
  /** Refetch valuables function */
  refetch?: () => void;
  /** The list of valuables to be displayed as cards */
  valuables: Array<A.PlayerValuableList_PlayerValuableFragment>;
  /** The function to be called to consume the valuable which will be triggered by each card click */
  onConsumeValuable: (s: string) => Promise<void>;
  /** The function to be called on click of a valuable row item */
  onItemClick?: (s: string) => void;
  /** Icon to be used as selector */
  valuableSelector?: React.ReactNode;
  /** Allows a valuable item to be selectable */
  isItemSelectable: boolean;
  /** An array of translated labels */
  translations: ValuableListTranslations;
};
