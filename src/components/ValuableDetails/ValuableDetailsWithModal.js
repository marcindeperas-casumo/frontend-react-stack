//@flow
import React, { type Node } from "react";
import { AbstractModal } from "Components/AbstractModal";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import { CloseButton as AbstractCloseButton } from "Components/AbstractModal/CloseButton";
import "./ValuableDetails.scss";

type Props = {
  /** Should this view be displayed? */
  isOpen: boolean,
  /** Close button callback */
  onClose: () => void,
  valuableDetails: ValuableDetails_PlayerValuable,
  children: Node,
};

const CloseButton = () => (
  <AbstractCloseButton className="c-close-button--inverted" />
);

export const ValuableDetailsWithModal = ({
  isOpen,
  onClose,
  children,
  ...props
}: Props) => {
  return (
    <AbstractModal
      isOpen={isOpen}
      hideModal={onClose}
      className="c-valuable-details-modal c-valuable-details-modal--mobile-landscape"
      closeTimeoutMS={100}
      CloseButton={CloseButton}
    >
      <ValuableDetailsContainer {...props}>{children}</ValuableDetailsContainer>
    </AbstractModal>
  );
};
