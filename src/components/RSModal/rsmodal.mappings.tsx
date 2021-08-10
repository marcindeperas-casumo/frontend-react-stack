import * as React from "react";
import * as R from "ramda";
import { REACT_APP_MODAL } from "Src/constants";
import { DanishEntryOverlayContainer } from "Components/DanishOverlayFlow";
import { overlayContentCmsSlug } from "Models/playOkay";
import type { ModalId, ModalConfig } from "Models/modal";
import { isMandatoryMessageModalId } from "Models/modal";
import { cmsSlugs } from "Models/tac";
import { CMS_SLUGS as MODAL_CMS_SLUGS } from "Models/playing/playing.constants";
import { CMS_SLUGS as SCS_CMS_SLUGS } from "Models/slotControlSystem";
import { REALITY_CHECK_CMS_SLUG } from "Models/playOkay/realityCheck";
import { PaymentUsePiqIframeModal } from "Components/Payments";
import { ContentHtmlModal } from "Components/ContentHtml";
import { ArticleModal } from "Components/ArticlesList/ArticleModal";
import { GameLaunchModal } from "Components/RSModal/GameLaunchOnboarding";
import { JackpotTermsAndConditionsModal } from "Components/JackpotDetailPage/JackpotTermsAndConditionsModal";
import { MandatoryMessageModal } from "Components/Compliance/MandatoryMessages";
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
import {
  PostPanicButtonModal,
  PrePanicButtonModal,
  FiveMinuteBreakFinishedModal,
  FiveMinuteBreakOngoingModal,
  FiveMinuteBreakReelRaceModal,
} from "./GGL";
import { PaymentResult } from "./Payments";
import { ReelRacesTAC } from "./ReelRacesTAC";
import { AccountWarmUp } from "./AccountWarmUp";

export type ModalContentComponent<T> = {
  /** object with translations for provided slug, null if still fetching */
  t: T | null;
  /** object that was passed with spawn action, defaults to empty object */
  config: ModalConfig;
  acceptModal: (result?: any) => void;
  closeModal: (result?: any) => void;
  dismissModal: (result?: any) => void;
};

interface ModalProps {
  slug: string; // cms slug
  Content: React.ComponentType<ModalContentComponent<Object>>;
}
type Mapping = Record<ModalId, ModalProps>;

export const mappings: Mapping = {
  TERMS_AND_CONDITIONS_SPAIN: {
    slug: cmsSlugs.main,
    Content: TermsAndConditions,
  },
  JACKPOT_TERMS_AND_CONDITIONS: {
    slug: "",
    Content: JackpotTermsAndConditionsModal,
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
  PIQ_REDIRECTION_IFRAME_MODAL: {
    slug: "",
    Content: PaymentUsePiqIframeModal,
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
    // @ts-expect-error ts-migrate(2322) FIXME: Type '({ acceptModal, config: { type }, t, }: Bonu... Remove this comment to see the full error message
    Content: BonusBalanceInGameNotification,
  },
  [REACT_APP_MODAL.ID.QUIT_GAME_NOTIFICATION]: {
    slug: MODAL_CMS_SLUGS.MODAL_WAGERING,
    // @ts-expect-error ts-migrate(2322) FIXME: Type '({ acceptModal, t, }: QuitGameNotificationPr... Remove this comment to see the full error message
    Content: QuitGameNotification,
  },
  [REACT_APP_MODAL.ID.GAME_PAGE_RR_LEADERBOARD]: {
    slug: "",
    Content: ReelRaceLeaderboardModal,
  },
  [REACT_APP_MODAL.ID.GGL_POST_PANIC_BUTTON]: {
    slug: "",
    Content: PostPanicButtonModal,
  },
  [REACT_APP_MODAL.ID.GGL_PRE_PANIC_BUTTON]: {
    slug: "",
    Content: PrePanicButtonModal,
  },
  [REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_FINISHED]: {
    slug: "",
    Content: FiveMinuteBreakFinishedModal,
  },
  [REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_ONGOING]: {
    slug: "",
    // @ts-expect-error ts-migrate(2322) FIXME: Type '({ acceptModal, config }: Props) => Element'... Remove this comment to see the full error message
    Content: FiveMinuteBreakOngoingModal,
  },
  [REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_REEL_RACE]: {
    slug: "",
    // @ts-expect-error ts-migrate(2322) FIXME: Type '({ acceptModal, config }: Props) => Element'... Remove this comment to see the full error message
    Content: FiveMinuteBreakReelRaceModal,
  },
  [REACT_APP_MODAL.ID.PAYMENT_RESULT]: {
    slug: "",
    Content: PaymentResult,
  },
  [REACT_APP_MODAL.ID.CONTENT_HTML]: {
    slug: "",
    Content: ContentHtmlModal,
  },
  [REACT_APP_MODAL.ID.REEL_RACES_TAC]: {
    slug: "",
    Content: ReelRacesTAC,
  },
  [REACT_APP_MODAL.ID.ARTICLE_MODAL]: {
    slug: "",
    Content: ArticleModal,
  },
  [REACT_APP_MODAL.ID.GAMELAUNCH_MODAL]: {
    slug: "",
    Content: GameLaunchModal,
  },
  [REACT_APP_MODAL.ID.ACCOUNT_WARM_UP]: {
    slug: "",
    Content: AccountWarmUp,
  },
};

export const getMandatoryMessageModalData: (modalId: ModalId) => ModalProps =
  R.ifElse(
    R.has(R.__, mappings),
    R.prop(R.__, mappings),
    R.assoc("slug", R.__, { Content: MandatoryMessageModal })
  );

export const getModalData: (modalId: ModalId | null) => ModalProps = R.ifElse(
  isMandatoryMessageModalId,
  getMandatoryMessageModalData,
  R.propOr({ Content: ModalLoadingState }, R.__, mappings)
);
