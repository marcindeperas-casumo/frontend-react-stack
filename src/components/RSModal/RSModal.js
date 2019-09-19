// @flow
import * as React from "react";
import ReactModal from "react-modal";
import { useTranslations, useDelayedCleanup } from "Utils/hooks";
import { useSelectModal, useHideModal } from "Models/modal";
import { ModalHeader } from "./RSModalHeader";
import { getModalData } from "./rsmodal.mappings";
import "./rsmodals.scss";

const CLOSING_ANIMATION_LENGTH_MS = 150;

export function Modal() {
  const state = useSelectModal();
  const modalId = useDelayedCleanup(state.modalId, CLOSING_ANIMATION_LENGTH_MS);
  const { slug, Content } = getModalData(modalId);
  const hideModal = useHideModal(modalId);
  const t = useTranslations(slug);

  return (
    <ReactModal
      isOpen={Boolean(state.modalId)}
      onRequestClose={hideModal}
      className="t-background-white o-flex--vertical c-rsmodal"
      overlayClassName="c-rsmodal__overlay"
      closeTimeoutMS={CLOSING_ANIMATION_LENGTH_MS}
      shouldCloseOnOverlayClick={!state.config.mustAccept}
      shouldCloseOnEsc={!state.config.mustAccept}
    >
      <ModalHeader
        title={t.title}
        hideModal={hideModal}
        showCloseButton={!state.config.mustAccept}
      />
      <Content t={t} />
    </ReactModal>
  );
}
