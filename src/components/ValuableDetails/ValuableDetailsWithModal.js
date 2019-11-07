//@flow
import React, { type Node } from "react";
import * as A from "Types/apollo";
import { AbstractModal } from "Components/AbstractModal";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import "./ValuableDetails.scss";

type Props = {
  /** Should this view be displayed? */
  isOpen: boolean,
  /** Close button callback */
  onClose: () => void,
  valuableDetails: A.ValuableDetails_PlayerValuable,
  children: Node,
};

export const ValuableDetailsWithModal = ({
  isOpen,
  onClose,
  children,
  ...props
}: Props) => (
  <AbstractModal
    isOpen={isOpen}
    hideModal={onClose}
    className="c-valuable-details-modal u-height--full u-width--full"
    closeTimeoutMS={100}
  >
    <ValuableDetailsContainer {...props}>{children}</ValuableDetailsContainer>
  </AbstractModal>
);
