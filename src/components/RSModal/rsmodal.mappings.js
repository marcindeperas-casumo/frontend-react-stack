// @flow
import * as React from "react";
import * as R from "ramda";
import { REACT_APP_MODAL } from "Src/constants";
import { DanishEntryOverlayContainer } from "Components/DanishOverlayFlow";
import { overlayContentCmsSlug } from "Models/playOkay";
import type { ModalId, ModalConfig } from "Models/modal";
import { cmsSlugs } from "Models/tac";
import { CMS_SLUGS as MODAL_CMS_SLUGS } from "Models/playing/playing.constants";
import { CMS_SLUGS as SCS_CMS_SLUGS } from "Models/slotControlSystem";
import { REALITY_CHECK_CMS_SLUG } from "Models/playOkay/realityCheck";
import { TermsAndConditions } from "./TermsAndConditions";
import {
  BeforePlaying,
  BeforeLoggingOut,
  AfterLimitsReached,
  TimeRemainingNotification,
  PeriodicReminderNotification,
  LimitAlmostConsumedNotification,
} from "./SlotControlSystem";
import { TimeLimitsFormModalContainer } from "./TimeLimits/TimeLimitsFormModalContainer";
import { QuitGameNotification } from "./Slots/QuitGameNotification";
import { BonusBalanceInGameNotification } from "./Slots/BonusBalanceInGameNotification";
import { ReelRaceLeaderboardModal } from "./Slots/ReelRaceLeaderboardModal";
import { RealityCheck } from "./RealityCheck";
import { ModalLoadingState } from "./RSModalLoading";
import { GameRoundDetails } from "./History";

export type ModalContentComponent<T> = {|
  /** object with translations for provided slug, null if still fetching */
  t: ?T,
  /** object that was passed with spawn action, defaults to empty object */
  config: ModalConfig,
  acceptModal: (result?: any) => void,
  closeModal: (result?: any) => void,
  dismissModal: (result?: any) => void,
|};

type Mapping = {
  [ModalId]: {
    // cms slug
    slug: string,
    Content: React.ComponentType<ModalContentComponent<Object>>,
  },
};

export const mappings: Mapping = {
  TERMS_AND_CONDITIONS_SPAIN: {
    slug: cmsSlugs.main,
    Content: TermsAndConditions,
  },
  GAME_ROUND_DETAILS: {
    slug: "features.bets",
    Content: GameRoundDetails,
  },
  [REACT_APP_MODAL.ID.REALITY_CHECK]: {
    slug: REALITY_CHECK_CMS_SLUG,
    Content: RealityCheck,
  },
  DANISH_ENTRY_OVERLAY: {
    slug: overlayContentCmsSlug,
    Content: DanishEntryOverlayContainer,
  },
  SLOT_CONTROL_SYSTEM_PERIODIC_REMINDER_NOTIFICATION: {
    slug: SCS_CMS_SLUGS.PERIODIC_REMINDER_NOTIFICATION,
    Content: PeriodicReminderNotification,
  },
  SLOT_CONTROL_SYSTEM_LIMIT_ALMOST_CONSUMED_NOTIFICATION: {
    slug: SCS_CMS_SLUGS.LIMIT_ALMOST_CONSUMED_NOTIFICATION,
    Content: LimitAlmostConsumedNotification,
  },
  SLOT_CONTROL_SYSTEM_TIME_REMAINING_NOTIFICATION: {
    slug: SCS_CMS_SLUGS.TIME_REMAINING_NOTIFICATION,
    Content: TimeRemainingNotification,
  },
  [REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_CONFIGURATION]: {
    slug: SCS_CMS_SLUGS.BEFORE_PLAYING,
    Content: BeforePlaying,
  },
  [REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT]: {
    slug: SCS_CMS_SLUGS.AFTER_PLAYING,
    Content: BeforeLoggingOut,
  },
  [REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED]: {
    slug: SCS_CMS_SLUGS.AFTER_PLAYING,
    Content: AfterLimitsReached,
  },
  [REACT_APP_MODAL.ID.TIME_LIMITS_FORM]: {
    slug: "",
    Content: TimeLimitsFormModalContainer,
  },
  [REACT_APP_MODAL.ID.WAGERING_NOTIFICATION]: {
    slug: MODAL_CMS_SLUGS.MODAL_WAGERING,
    Content: BonusBalanceInGameNotification,
  },
  [REACT_APP_MODAL.ID.QUIT_GAME_NOTIFICATION]: {
    slug: MODAL_CMS_SLUGS.MODAL_WAGERING,
    Content: QuitGameNotification,
  },
  [REACT_APP_MODAL.ID.GAME_PAGE_RR_LEADERBOARD]: {
    slug: "",
    Content: ReelRaceLeaderboardModal,
  },
};

export const getModalData: (
  ModalId | null
) => {
  slug: string,
  Content: React.ComponentType<{}>,
} = R.propOr({ Content: ModalLoadingState }, R.__, mappings);
