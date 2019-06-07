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
  className?: string,
  dismissButtonClassName?: string,
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
      "c-sports-modal__header-button-container t-color-grey-light-2 t-border-r--circle",
      className
    )}
  >
    {children}
  </Flex.Item>
);

const BackButton = ({ onClick, className }: ButtonProps) => (
  <ButtonContainer onClick={onClick}>
    <Flex
      align="center"
      justify="center"
      className={classNames(
        "c-sports-modal-header__button c-sports-modal-header__button--back t-border-r--circle",
        className,
        onClick === noop && "u-visibility--hidden"
      )}
    >
      <ArrowLeftIcon />
    </Flex>
  </ButtonContainer>
);

const CloseButton = ({ onClick, className }: ButtonProps) => (
  <ButtonContainer onClick={onClick}>
    <Flex
      align="center"
      justify="center"
      className={classNames(
        "c-sports-modal-header__button c-sports-modal-header__button--close t-border-r--circle u-visibility--hidden@tablet",
        className,
        onClick === noop && "u-visibility--hidden"
      )}
    >
      <CrossIcon />
    </Flex>
  </ButtonContainer>
);

const FixedCloseButton = ({ onClick }: ButtonProps) => (
  <Flex
    align="center"
    justify="center"
    className={classNames(
      "c-sports-modal-header__fixed-button t-color-grey-light-2 t-background-grey-dark-3 u-display--none@mobile",
      onClick === noop && "u-visibility--hidden"
    )}
    onClick={onClick}
  >
    <CrossIcon />
  </Flex>
);

export const SportsModalHeader = ({
  children,
  onBack = noop,
  onClose = noop,
  className = "t-background-grey-dark-3 t-color-white",
  dismissButtonClassName = "t-background-grey-dark-4",
}: HeaderProps) => (
  <Flex
    align="center"
    justify="center"
    spacing="none"
    className={classNames(
      "c-sports-modal-header u-font-weight-bold u-padding--md u-text-align-center",
      className
    )}
  >
    <FixedCloseButton onClick={onClose} />
    <BackButton onClick={onBack} className={dismissButtonClassName} />
    <Flex.Block className="c-sports-modal-header__heading">
      {children}
    </Flex.Block>
    <CloseButton onClick={onClose} className={dismissButtonClassName} />
  </Flex>
);

export const components = {
  BackButton,
  CloseButton,
  FixedCloseButton,
};
