// @flow
import * as React from "react";
import ReactModal from "react-modal";
import {
  useTranslations,
  useDelayedCleanup,
  useJurisdiction,
} from "Utils/hooks";
import { useSelectModal, useHideModal } from "Models/modal";
import { getModalData } from "./rsmodal.mappings";
import "./rsmodals.scss";

const CLOSING_ANIMATION_LENGTH_MS = 150;

export function Modal() {
  const state = useSelectModal();
  const modalId = useDelayedCleanup(state.modalId, CLOSING_ANIMATION_LENGTH_MS);
  const { slug, Content } = getModalData(modalId);
  const { closeModal, dismissModal, acceptModal } = useHideModal(modalId);
  const t = useTranslations(slug);
  const { jurisdiction } = useJurisdiction();

  return (
    <ReactModal
      isOpen={Boolean(state.modalId)}
      onRequestClose={dismissModal}
      className="t-background-white o-flex--vertical t-border-r@tablet c-rsmodal"
      overlayClassName={`c-rsmodal__overlay c-rsmodal__overlay--${jurisdiction}`}
      closeTimeoutMS={CLOSING_ANIMATION_LENGTH_MS}
      shouldCloseOnOverlayClick={!state.config.mustAccept}
      shouldCloseOnEsc={!state.config.mustAccept}
    >
      <Content
        t={t}
        closeModal={closeModal}
        dismissModal={dismissModal}
        acceptModal={acceptModal}
        config={state.config}
      />
    </ReactModal>
  );
}
