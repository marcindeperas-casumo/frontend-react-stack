import * as React from "react";
import { useTranslations, useDelayedCleanup } from "Utils/hooks";
import { useSelectModal, useHideModal } from "Models/modal";
import { ModalBase } from "./RSModalBase";
import { getModalData } from "./rsmodal.mappings";

const CLOSING_ANIMATION_LENGTH_MS = 150;

export function Modal() {
  const state = useSelectModal();
  const modalId = useDelayedCleanup(state.modalId, CLOSING_ANIMATION_LENGTH_MS);
  const { slug, Content } = getModalData(modalId);
  const { closeModal, dismissModal, acceptModal } = useHideModal(modalId);
  const t = useTranslations<{}>(slug);

  return (
    <ModalBase
      isOpen={Boolean(state.modalId)}
      mustAccept={!state.config?.mustAccept}
      onRequestClose={dismissModal}
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; isOpen: boolean; mustAc... Remove this comment to see the full error message
      closeTimeoutMS={CLOSING_ANIMATION_LENGTH_MS}
    >
      <Content
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ t: {}; closeModal: (result?: any) => void;... Remove this comment to see the full error message
        t={t}
        closeModal={closeModal}
        dismissModal={dismissModal}
        acceptModal={acceptModal}
        config={state.config}
      />
    </ModalBase>
  );
}
