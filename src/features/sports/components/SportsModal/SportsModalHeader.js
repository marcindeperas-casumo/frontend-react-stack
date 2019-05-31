// @flow
import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import { cond, equals, T } from "ramda";
import { ArrowLeftIcon, CrossIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import { Modal } from "Components/Modal";

import "./SportsModalHeader.scss";

type SharedProps = {
  children: Node,
};

type HeaderProps = SharedProps & {
  onBack?: () => void,
  onClose?: () => void,
};

type DismissTypeProps = {
  dismissType?: "none" | "back" | "close",
};

type ButtonProps = {
  onClick: () => any,
};

type ButtonContainerProps = {
  className?: string,
  children?: Node,
};

const noop = () => {};

const Header = Flex.Block;

const BackButton = ({ onClick }: ButtonProps) => (
  <ButtonContainer>
    <div
      onClick={onClick}
      className="c-sports-modal__dismiss-button c-sports-modal__dismiss-button--back"
    >
      <ArrowLeftIcon size="med" />
    </div>
  </ButtonContainer>
);

const CloseButton = ({ onClick }: ButtonProps) => (
  <ButtonContainer>
    <div
      onClick={onClick}
      className="c-sports-modal__dismiss-button c-sports-modal__dismiss-button--close"
    >
      <CrossIcon size="med" />
    </div>
  </ButtonContainer>
);

const FloatingCloseButton = ({ onClick }: ButtonProps) => (
  <div className="c-sports-modal__dismiss-button c-sports-modal__dismiss-button--floating">
    <CrossIcon size="med" />
  </div>
);

const ButtonContainer = ({ children, className }: ButtonContainerProps) => (
  <Flex.Item
    className={classNames(
      "c-sports-modal__dismiss-button-container",
      className
    )}
  >
    {children}
  </Flex.Item>
);

const WithCloseButton = ({
  children,
  onClose = noop,
  onBack = noop,
}: HeaderProps) => (
  <>
    <FloatingCloseButton onClick={onClose} />
    <ButtonContainer className="u-display--none u-display--flex@tablet" />
    <Header>{children}</Header>
    <CloseButton onClick={onClose} />
  </>
);

const WithBackButton = ({
  children,
  onClose = noop,
  onBack = noop,
}: HeaderProps) => (
  <>
    <FloatingCloseButton onClick={onClose} />
    <BackButton onClick={onBack} />
    <Header>{children}</Header>
    <ButtonContainer />
  </>
);

const WithoutDismissButtons = ({ children }: HeaderProps) => (
  <Header>{children}</Header>
);

export const SportsModalHeader = ({
  dismissType = "none",
  ...passthroughProps
}: HeaderProps & DismissTypeProps) => {
  const HeaderVariant = cond([
    [equals("back"), () => WithBackButton],
    [equals("close"), () => WithCloseButton],
    [T, () => WithoutDismissButtons],
  ])(dismissType);

  return (
    <Flex
      align="center"
      justify="center"
      spacing="none"
      className="c-sports-modal__header t-background-grey-dark-3 t-color-white u-padding u-text-align-center"
    >
      <HeaderVariant {...passthroughProps} />
    </Flex>
  );
};

export const variants = {
  WithBackButton,
  WithCloseButton,
  WithoutDismissButtons,
};

export const buttons = {
  BackButton,
  ButtonContainer,
  CloseButton,
  FloatingCloseButton,
};
