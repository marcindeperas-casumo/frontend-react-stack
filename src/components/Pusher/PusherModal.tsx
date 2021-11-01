import React from "react";
import { AbstractModal } from "Components/AbstractModal";

type OwnProps = {
  children: React.ReactChild;
  CloseButton?: React.ComponentType<{ onClick: () => void }>;
  hideModal: () => void;
  isOpen: boolean;
  className?: string;
};

type Props = OwnProps & ReactModal.Props;

export const PusherModal = ({
  isOpen,
  children,
  hideModal,
  ...props
}: Props) => (
  <AbstractModal
    isOpen={isOpen}
    hideModal={hideModal}
    className="c-valuable-details-modal u-height--full u-width--full"
    closeTimeoutMS={100}
  >
    {children}
  </AbstractModal>
);
