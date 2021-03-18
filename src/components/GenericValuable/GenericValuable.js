/* @flow */
import React, { type Node } from "react";
import { allPass, propIs } from "ramda";
import Flex from "@casumo/cmp-flex";
import Badge from "@casumo/cmp-badge";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import { interpolate, convertHoursToDaysRoundUp } from "Utils";
import { launchErrorModal } from "Services/LaunchModalService";
import { depositBonusSelected } from "Services/DepositBonusSelectedService";
import { navigate } from "Services/NavigationService";
import { launchGame } from "Services/LaunchGameService";
import {
  type ValuableDetailsTranslations as Translations,
  type ValuableActionProps,
  VALUABLE_STATES,
  VALUABLE_TYPES,
  getValuableDetailsAction,
  durationToTranslationKey,
  type ValuableRequirementType,
  getExpiryTimeLeft,
  type DurationProps,
} from "Models/valuables";
import MaskImage from "Components/MaskImage";
import DangerousHtml from "Components/DangerousHtml";
// import { ValuableWageringProgressBar } from "./ValuableWageringProgressBar";
// import OpenPadlock from "./open-padlock.svg";
// import "./ValuableDetails.scss";

export const expirationBadgeClasses = {
  expiresToday: "red-30",
  default: "grey-50",
};

type Game = {
  slug: string,
};

type BadgeInfoType = {
  key: string,
  value: number,
};

type Props = { // V. ROW
  /** Unique id of the valuable */
  id: string,
  /** Title of the valuable */
  title: string,
  /** Description of the valuable. Ex: title of a game etc.*/
  description?: string,
  /** Valuable type of the valuable */
  valuableType: ValuableType,
  /** award type - applies when valuableType === Wagering Lock */
  awardType?: A.WageringLockAwardType,
  /** currency of the player */
  currency: string,
  /** The coin value of each spin. Applies when valuable is type spins */
  coinValue?: number,
  /** Market of the player */
  market: string,
  /** URL of background image to be displayed in the Card header */
  backgroundImage: string,
  /** Valuable caveats to be displayed */
  caveat: ?string,
  /** The state of the valuable */
  valuableState: ValuableState,
  /** Translations */
  translations: Translations,
  isSelected?: boolean,
  expiryDate: number,
  /** Function to be triggered on click of card */
  onClick?: () => void,
  /** Function to be triggered on click of the more icon */
  onMoreInfo: ?() => void,
};

export type Props = {
  valuableDetails: A.ValuableDetails_PlayerValuable,
  /** The function to be called to consume the valuable which will be triggered by each card click */
  onConsumeValuable: (id: string) => Promise<void>,
  translations: Translations,
  children: Node,
};

export default function GenericValuable() {
  return <
}
