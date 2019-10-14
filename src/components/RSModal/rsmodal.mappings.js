// @flow
import * as React from "react";
import * as R from "ramda";
import type { ModalId, ModalConfig } from "Models/modal";
import { cmsSlugs } from "Models/tac";
import {
  MODALS as SCS_MODALS,
  CMS_SLUGS as SCS_CMS_SLUGS,
} from "Models/slotControlSystem";
import { exitConfiguration } from "Services/SlotControlSystemService";
import { TermsAndConditions } from "./TermsAndConditions";
import { SlotControlSystemContainer } from "./SlotControlSystem";
import { ModalLoadingState } from "./RSModalLoading";

export type ModalContentComponent<T> = {|
  /** object with translations for provided slug, null if still fetching */
  t: ?T,
  /** object that was passed with spawn action, defaults to empty object */
  config: ModalConfig,
  closeModal: () => void,
  dismissModal: () => void,
  acceptModal: () => void,
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
    Content: SlotControlSystemContainer,
    onHideModal: exitConfiguration,
  },
};

export const getModalData: (
  ModalId | null
) => {
  slug: string,
  Content: React.ComponentType<{}>,
} = R.propOr({ Content: ModalLoadingState }, R.__, mappings);
