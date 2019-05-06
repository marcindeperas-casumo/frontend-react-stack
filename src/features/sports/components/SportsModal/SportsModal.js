/* @flow */
import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import { ArrowLeftIcon, CrossIcon } from "@casumo/cmp-icons";
import { Modal } from "Components/Modal";

import "./SportsModal.scss";

type SharedProps = {
  className?: string,
  children: Node,
};

type ModalProps = SharedProps;

type ContentProps = SharedProps;

type DismissButtonProps = {
  children: Node,
  onClick?: () => void,
  isVisible: boolean,
  className?: string,
};

type HeaderProps = SharedProps & {
  onClose?: () => void,
  onBack?: () => void,
};

export const DismissButton = ({
  children,
  onClick,
  isVisible,
  className,
}: DismissButtonProps) => (
  <div
    align="center"
    justify="center"
    className={classNames("c-sports-modal__dismiss-button", className)}
    onClick={onClick}
    style={{ visibility: isVisible ? "visible" : "hidden" }}
  >
    {children}
  </div>
);

const Header = ({ children, onClose, onBack }: HeaderProps) => (
  <Modal.Header className="c-sports-modal__header u-padding">
    <DismissButton
      className="c-sports-modal__back-button"
      onClick={onBack}
      isVisible={Boolean(onBack)}
    >
      <ArrowLeftIcon size="med" />
    </DismissButton>

    <div className="o-flex-justify--center o-flex--1 u-font-weight-bold">
      {children}
    </div>

    <DismissButton
      className="c-sports-modal__close-button"
      onClick={onClose}
      isVisible={Boolean(onClose)}
    >
      <CrossIcon size="med" />
    </DismissButton>
  </Modal.Header>
);

const Content = ({ children, className }: ContentProps) => (
  <Modal.Content className={classNames("u-padding-horiz--md", className)}>
    <div className="c-sports-modal__content-inner">{children}</div>
  </Modal.Content>
);

export class SportsModal extends React.Component<ModalProps> {
  static defaultProps = {
    dismissType: "close",
  };

  static Header = Header;
  static Footer = Modal.Footer;
  static Content = Content;

  render() {
    return <Modal className="c-sports-modal">{this.props.children}</Modal>;
  }
}
