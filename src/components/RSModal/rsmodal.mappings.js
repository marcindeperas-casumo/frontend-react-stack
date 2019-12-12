// @flow
import * as React from "react";
import * as R from "ramda";
import type { ModalId, ModalConfig } from "Models/modal";
import { cmsSlugs } from "Models/tac";
import {
  MODALS as SCS_MODALS,
  CMS_SLUGS as SCS_CMS_SLUGS,
} from "Models/slotControlSystem";
import { REALITY_CHECK_CMS_SLUG } from "Models/playOkay/realityCheck";
import { TermsAndConditions } from "./TermsAndConditions";
import { SlotControlSystem } from "./SlotControlSystem";
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
  [SCS_MODALS.CONFIGURATION]: {
    slug: SCS_CMS_SLUGS.CONFIGURATION_SCREEN,
    Content: SlotControlSystem,
  },
  REALITY_CHECK_MODAL: {
    slug: REALITY_CHECK_CMS_SLUG,
    Content: RealityCheck,
  },
};

export const getModalData: (
  ModalId | null
) => {
  slug: string,
  Content: React.ComponentType<{}>,
} = R.propOr({ Content: ModalLoadingState }, R.__, mappings);
