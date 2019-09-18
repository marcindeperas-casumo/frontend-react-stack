// @flow
import * as React from "react";
import ReactModal from "react-modal";
import classNames from "classnames";
import type { ModalKind } from "Models/modal";
import { ModalContent } from "./RSModalContent";
import { ModalHeader } from "./RSModalHeader";
import "./rsmodals.scss";

type TextProp = {
  content: string,
  title: string,
};
type Props = {
  /* type of modal, see modal.mappings */
  modalType?: ModalKind,
  /* function that should set modalType prop to null */
  hideModal: () => void,
  /* translated text */
  t: ?TextProp,
  /* custom content renderer */
  customContent?: React.Node,
  /* optional classes for the modal */
  className?: string,
  /* optional classes for the portal element that wraps overlay and modal */
  portalClassName?: string,
};

const CLOSING_ANIMATION_LENGTH_MS = 150;

export function Modal(props: Props) {
  const text = useDelayedText(props.modalType, props.t);

  return (
    <ReactModal
      isOpen={Boolean(props.modalType)}
      onRequestClose={props.hideModal}
      className={classNames(
        "t-background-white o-flex--vertical c-rsmodal",
        props.className
      )}
      overlayClassName="c-rsmodal__overlay"
      portalClassName={classNames("c-rsmodal__portal", props.portalClassName)}
      closeTimeoutMS={CLOSING_ANIMATION_LENGTH_MS}
    >
      <ModalHeader title={text && text.title} hideModal={props.hideModal} />
      {props.customContent || <ModalContent content={text && text.content} />}
    </ReactModal>
  );
}

export function useDelayedText(modalProp: ?ModalKind, textProp: ?TextProp) {
  const [modal, setModal] = React.useState(modalProp);
  const [text, setText] = React.useState(textProp);

  React.useEffect(() => {
    if (textProp !== null) {
      setText(textProp);
    }

    if (modal === modalProp) {
      // state doesn't change if modal is the same
      return;
    }

    function changeModal() {
      setModal(() => modalProp);
      /**
       * text is set to proper value in the beginning of this hook, but we
       * have to clear it here every time modal changes.
       * Without that we could show last seen modal instead of loading state.
       */
      setText(() => null);
    }

    if (modalProp === null) {
      /**
       * if modalProp is null we are showing closing animation. Until it ends
       * we have to hold reference to old data because it is still visible.
       */
      const timeoutId = setTimeout(changeModal, CLOSING_ANIMATION_LENGTH_MS);

      return function cleanup() {
        clearTimeout(timeoutId);
      };
    } else {
      // If we are replacing modal with new one it should change right away
      changeModal();
    }
  }, [modal, modalProp, textProp]);

  return text;
}
