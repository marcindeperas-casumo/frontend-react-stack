// @flow
import * as React from "react";
import ReactModal from "react-modal";
import classNames from "classnames";
import { useJurisdiction } from "Utils/hooks";
import { isMobile } from "Components/ResponsiveLayout";
import "./rsmodals.scss";

const CLOSING_ANIMATION_LENGTH_MS = 150;
type Props = {
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
  mustAccept: boolean,
  isOpen: boolean,
  onRequestClose: Function,
  isWide?: boolean,
};
export function ModalBase({
  children,
  mustAccept,
  isOpen,
  onRequestClose,
  isWide = false,
}: Props) {
  const { jurisdiction } = useJurisdiction();

  return (
    <ReactModal
      isOpen={isOpen}
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      onRequestClose={onRequestClose}
      className={classNames(
        "t-background-white o-flex--vertical c-rsmodal u-overflow--hidden",
        {
          "t-border-r--md": !isMobile(),
          "c-rsmodal__wide": isWide,
        }
      )}
      overlayClassName={`c-rsmodal__overlay c-rsmodal__overlay--${jurisdiction}`}
      closeTimeoutMS={CLOSING_ANIMATION_LENGTH_MS}
      shouldCloseOnOverlayClick={!mustAccept}
      shouldCloseOnEsc={!mustAccept}
    >
      {children}
    </ReactModal>
  );
}
