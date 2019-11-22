//@flow
import React from "react";
import { PlayerDepositValuables } from "Components/PlayerDepositValuables";
import { AbstractModal } from "Components/AbstractModal";

type Props = {
  /** Should this view be displayed? */
  isOpen: boolean,
  /** Close button callback */
  onClose: () => void,
};

export const PlayerDepositValuablesWithModal = ({
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
    <PlayerDepositValuables />
  </AbstractModal>
);
