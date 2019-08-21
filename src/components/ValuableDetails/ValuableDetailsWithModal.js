//@flow
import React, { type Node } from "react";
import { AbstractModal } from "Components/AbstractModal";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import "./ValuableDetails.scss";

type Props = {
  /** Should this view be displayed? */
  isOpen: boolean,
  /** Close button callback */
  onClose: () => void,
  /** Close modal delay  (used in stories)*/
  closeTimeoutMS?: number,
  valuableDetails: ValuableDetails_PlayerValuable,
  children: Node,
};

export const ValuableDetailsWithModal = ({
  isOpen,
  onClose,
  closeTimeoutMS,
  children,
  ...props
}: Props) => {
  return (
    <AbstractModal
      isOpen={isOpen}
      hideModal={onClose}
      className="c-valuable-details-modal c-valuable-details-modal--mobile-landscape"
      closeTimeoutMS={closeTimeoutMS}
    >
      <ValuableDetailsContainer {...props}>{children}</ValuableDetailsContainer>
    </AbstractModal>
  );
};
