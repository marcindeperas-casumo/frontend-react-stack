// @flow
import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import { ArrowLeftIcon, CrossIcon } from "@casumo/cmp-icons";
import { Modal } from "Components/Modal";

import "./SportsModalHeader.scss";

type SharedProps = {
  children: Node,
  className?: string,
};

type DismissButtonProps = SharedProps & {
  isVisible: boolean,
  onClick?: () => void,
};

type HeaderProps = SharedProps & {
  onBack?: () => void,
  onClose?: () => void,
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

export const SportsModalHeader = ({
  children,
  onClose,
  onBack,
}: HeaderProps) => (
  <Modal.Header className="c-sports-modal__header u-padding">
    <DismissButton
      data-test="sports-modal-back-button"
      className="c-sports-modal__dismiss-button--back"
      onClick={onBack}
      isVisible={Boolean(onBack)}
    >
      <ArrowLeftIcon size="med" />
    </DismissButton>

    <div className="o-flex-justify--center o-flex--1 u-font-weight-bold">
      {children}
    </div>

    <DismissButton
      data-test="sports-modal-close-button"
      className="c-sports-modal__dismiss-button--close"
      onClick={onClose}
      isVisible={Boolean(onClose)}
    >
      <CrossIcon size="med" />
    </DismissButton>
  </Modal.Header>
);
