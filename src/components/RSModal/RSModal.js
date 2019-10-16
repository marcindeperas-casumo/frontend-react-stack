// @flow
import * as React from "react";
import ReactModal from "react-modal";
import { useTranslations, useDelayedCleanup } from "Utils/hooks";
import { useSelectModal, useHideModal } from "Models/modal";
import { getModalData } from "./rsmodal.mappings";
import "./rsmodals.scss";

const CLOSING_ANIMATION_LENGTH_MS = 150;

export function Modal() {
  const state = useSelectModal();
  const modalId = useDelayedCleanup(state.modalId, CLOSING_ANIMATION_LENGTH_MS);
  const { slug, Content, ...modalData } = getModalData(modalId);
  const { closeModal, dismissModal, acceptModal } = useHideModal(modalId);
  const t = useTranslations(slug);
  const doDismissModal = () => {
    dismissModal();
    // $FlowIgnore
    modalData.dismissModal?.(); // eslint-disable-line no-unused-expressions
  };
  const doAcceptModal = () => {
    acceptModal();
    // $FlowIgnore
    modalData.acceptModal?.(); // eslint-disable-line no-unused-expressions
  };

  return (
    <ReactModal
      isOpen={Boolean(state.modalId)}
      onRequestClose={doDismissModal}
      className="t-background-white o-flex--vertical t-border-r c-rsmodal"
      overlayClassName="c-rsmodal__overlay"
      closeTimeoutMS={CLOSING_ANIMATION_LENGTH_MS}
      shouldCloseOnOverlayClick={!state.config.mustAccept}
      shouldCloseOnEsc={!state.config.mustAccept}
    >
      <Content
        t={t}
        closeModal={closeModal}
        dismissModal={doDismissModal}
        acceptModal={doAcceptModal}
        config={state.config}
      />
    </ReactModal>
  );
}
