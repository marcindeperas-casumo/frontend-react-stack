// @flow
import React, { PureComponent, type Node } from "react";
import classNames from "classnames";
import ReactModal from "react-modal";
import { CloseButton as CloseBtn } from "./CloseButton";
import "./AbstractModal.scss";

type Props = {
  children: Node,
  CloseButton: any => Node,
  hideModal: () => void,
  isOpen: boolean,
  className?: string,
};

export class AbstractModal extends PureComponent<Props> {
  static defaultProps = {
    CloseButton: CloseBtn,
  };

  render() {
    const {
      children,
      CloseButton,
      hideModal,
      isOpen,
      className,
      ...rest
    } = this.props;

    return (
      <>
        <ReactModal
          isOpen={isOpen}
          onRequestClose={hideModal}
          className={classNames(
            " t-background-white u-position-relative",
            className
              ? className
              : "c-abstract-modal--default u-height--full u-width--full"
          )}
          overlayClassName="c-abstract-modal__overlay"
          {...rest}
        >
          <div className="c-abstract-modal__content u-height--1/1">
            {children}
          </div>
          <div className="c-abstract-modal__close u-padding u-position-absolute">
            <CloseButton data-test="modal-close-button" onClick={hideModal} />
          </div>
        </ReactModal>
      </>
    );
  }
}
