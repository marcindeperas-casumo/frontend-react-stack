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
            "c-abstract-modal t-background-white",
            className ? className : "c-abstract-modal--default"
          )}
          overlayClassName="c-abstract-modal__overlay"
          {...rest}
        >
          <CloseButton data-test="modal-close-button" onClick={hideModal} />
          {children}
        </ReactModal>
      </>
    );
  }
}
