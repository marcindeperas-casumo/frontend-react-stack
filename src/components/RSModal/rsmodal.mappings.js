// @flow
import * as React from "react";
import * as R from "ramda";
import { REACT_APP_MODAL } from "Src/constants";
import { DanishEntryOverlayContainer } from "Components/DanishOverlayFlow";
import { overlayContentCmsSlug } from "Models/compliance/denmark";
import type { ModalId, ModalConfig } from "Models/modal";
import { cmsSlugs } from "Models/tac";
import { CMS_SLUGS as SCS_CMS_SLUGS } from "Models/slotControlSystem";
import { REALITY_CHECK_CMS_SLUG } from "Models/playOkay/realityCheck";
import { TermsAndConditions } from "./TermsAndConditions";
import {
  BeforePlaying,
  BeforeLoggingOut,
  AfterLimitsReached,
} from "./SlotControlSystem";
import { RealityCheck } from "./RealityCheck";
import { ModalLoadingState } from "./RSModalLoading";

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
  REALITY_CHECK_MODAL: {
    slug: REALITY_CHECK_CMS_SLUG,
    Content: RealityCheck,
  },
  DANISH_ENTRY_OVERLAY: {
    slug: overlayContentCmsSlug,
    Content: DanishEntryOverlayContainer,
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
};

export const getModalData: (
  ModalId | null
) => {
  slug: string,
  Content: React.ComponentType<{}>,
} = R.propOr({ Content: ModalLoadingState }, R.__, mappings);
