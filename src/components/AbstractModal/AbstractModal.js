// @flow
import React, { type Node, type Element } from "react";
import classNames from "classnames";
import ReactModal from "react-modal";
import { CloseButton } from "./CloseButton";
import "./AbstractModal.scss";

type Props = {
  children: Node,
  closeButton?: Element,
  hideModal: () => void,
  isOpen: boolean,
  className?: string,
};

export const AbstractModal = ({
  children,
  closeButton,
  hideModal,
  isOpen,
  className,
  ...rest
}: Props) => {
  const CloseBtn = closeButton || CloseButton;

  return (
    <>
      <CloseBtn onClick={hideModal} />
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
        {children}
      </ReactModal>
    </>
  );
};
