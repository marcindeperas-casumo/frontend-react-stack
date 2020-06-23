// @flow
import * as React from "react";
import ReactModal from "react-modal";
import { useJurisdiction } from "Utils/hooks";
import "./rsmodals.scss";

const CLOSING_ANIMATION_LENGTH_MS = 150;
type Props = {
  children: React.Node,
  mustAccept: boolean,
  isOpen: boolean,
  onRequestClose: Function,
};
export function ModalBase({
  children,
  mustAccept,
  isOpen,
  onRequestClose,
}: Props) {
  const { jurisdiction } = useJurisdiction();

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="t-background-white o-flex--vertical t-border-r c-rsmodal"
      overlayClassName={`c-rsmodal__overlay c-rsmodal__overlay--${jurisdiction}`}
      closeTimeoutMS={CLOSING_ANIMATION_LENGTH_MS}
      shouldCloseOnOverlayClick={!mustAccept}
      shouldCloseOnEsc={!mustAccept}
    >
      {children}
    </ReactModal>
  );
}
