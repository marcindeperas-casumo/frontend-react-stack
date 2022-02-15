import React from "react";
import * as A from "Types/apollo";
import { AbstractModal } from "Components/AbstractModal";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import "./ValuableDetails.scss";

type Props = {
  /** Should this view be displayed? */
  isOpen: boolean;
  /** Close button callback */
  onClose: () => void;
  valuableDetails: A.ValuableDetails_PlayerValuableFragment;
  onConsumeValuable: (id: string) => Promise<any>;
  children: React.ReactChild;
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
    className="c-valuable-details-modal u-height--full u-width--full t-border-r--md u-overflow--hidden c-valuable-details__abstract-modal-extra"
    overlayClassName="c-valuable-details__abstract-modal-extra"
    closeTimeoutMS={100}
  >
    <ValuableDetailsContainer {...props}>{children}</ValuableDetailsContainer>
  </AbstractModal>
);
