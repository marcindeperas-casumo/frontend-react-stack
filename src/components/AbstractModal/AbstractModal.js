// @flow
import React, { type Node } from "react";
import classNames from "classnames";
import ReactModal from "react-modal";
import { CloseButton } from "./AbstractModal.buttons";
import "./AbstractModal.scss";

type Props = {
  children: Node,
  hideModal: () => void,
  isOpen: boolean,
  className?: string,
};

export const AbstractModal = ({
  children,
  hideModal,
  isOpen,
  className,
  ...rest
}: Props) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={hideModal}
    className={classNames(
      "c-abstract-modal t-background-white",
      className ? className : "c-abstract-modal--default"
    )}
    overlayClassName="c-abstract-modal__overlay"
    {...rest}
  >
    <CloseButton onClick={hideModal} />
    {children}
  </ReactModal>
);
