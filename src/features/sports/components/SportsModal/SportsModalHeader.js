// @flow
import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import { ArrowLeftIcon, CrossIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";

import "./SportsModalHeader.scss";

type SharedProps = {
  children: Node,
};

type HeaderProps = SharedProps & {
  onBack?: Function,
  onClose?: Function,
};

type ButtonProps = {
  className?: string,
  onClick?: Function,
};

type ButtonContainerProps = ButtonProps & SharedProps;

const noop = () => {};

const ButtonContainer = ({
  children,
  className,
  onClick,
}: ButtonContainerProps) => (
  <Flex.Item
    onClick={onClick}
    className={classNames(
      "c-sports-modal__dismiss-button-container t-color-grey-light-2 t-border-r--circle",
      className
    )}
  >
    {children}
  </Flex.Item>
);

const BackButton = ({ className, onClick }: ButtonProps) => (
  <ButtonContainer onClick={onClick}>
    <div
      data-test="sports-modal-header-back-button"
      className={classNames(
        "c-sports-modal__dismiss-button c-sports-modal__dismiss-button--back t-background-grey-dark-4 t-border-r--circle",
        className,
        onClick === noop && "u-visibility--hidden"
      )}
    >
      <ArrowLeftIcon size="med" />
    </div>
  </ButtonContainer>
);

const CloseButton = ({ className, onClick }: ButtonProps) => (
  <ButtonContainer onClick={onClick}>
    <div
      data-test="sports-modal-header-close-button"
      className={classNames(
        "c-sports-modal__dismiss-button t-background-grey-dark-4 t-border-r--circle u-visibility--hidden@tablet",
        className,
        onClick === noop && "u-visibility--hidden"
      )}
    >
      <CrossIcon size="med" />
    </div>
  </ButtonContainer>
);

const FloatingCloseButton = ({ onClick }: ButtonProps) => (
  <div
    data-test="sports-modal-header-floating-close-button"
    className={classNames(
      "c-sports-modal__dismiss-button c-sports-modal__dismiss-button--floating t-color-grey-light-2 t-background-grey-dark-3 u-display--none@mobile",
      onClick === noop && "u-visibility--hidden"
    )}
    onClick={onClick}
  >
    <CrossIcon size="med" />
  </div>
);

export const SportsModalHeader = ({
  children,
  onBack = noop,
  onClose = noop,
}: HeaderProps) => (
  <Flex
    align="center"
    justify="center"
    spacing="none"
    className="c-sports-modal__header t-background-grey-dark-3 t-color-white u-font-weight-bold u-padding--md u-text-align-center"
  >
    <FloatingCloseButton onClick={onClose} />
    <BackButton onClick={onBack} />
    <Flex.Block>{children}</Flex.Block>
    <CloseButton onClick={onClose} />
  </Flex>
);

export const components = {
  BackButton,
  CloseButton,
  FloatingCloseButton,
};
