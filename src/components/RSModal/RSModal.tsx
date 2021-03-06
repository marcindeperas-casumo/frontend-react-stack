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
  const closeCallback = () => {
    state.additionalProps?.onDismissModal();
    dismissModal();
  };
  return (
    <ModalBase
      isOpen={Boolean(state.modalId)}
      mustAccept={Boolean(state.config?.mustAccept)}
      onRequestClose={closeCallback}
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; isOpen: boolean; mustAc... Remove this comment to see the full error message
      closeTimeoutMS={CLOSING_ANIMATION_LENGTH_MS}
      isWide={state.config?.isWide}
    >
      <Content
        t={t}
        additionalProps={state.additionalProps}
        closeModal={closeModal}
        dismissModal={dismissModal}
        acceptModal={acceptModal}
        config={state.config}
      />
    </ModalBase>
  );
}
