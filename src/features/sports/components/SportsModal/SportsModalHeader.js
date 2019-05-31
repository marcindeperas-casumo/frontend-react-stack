// @flow
import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import { cond, equals, T } from "ramda";
import { ArrowLeftIcon, CrossIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";

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
  onClick?: () => any,
  className?: string,
  isHidden?: boolean,
};

type ButtonContainerProps = {
  className?: string,
  children?: Node,
};

const noop = () => {};

const Header = Flex.Block;

const BackButton = ({ className, isHidden, onClick }: ButtonProps) => (
  <ButtonContainer>
    <div
      onClick={onClick}
      className={classNames(
        "c-sports-modal__dismiss-button c-sports-modal__dismiss-button--back t-background-grey-dark-4 t-border-r--circle",
        className,
        isHidden && "c-sports-modal__dismiss-button--hidden"
      )}
    >
      <ArrowLeftIcon size="med" />
    </div>
  </ButtonContainer>
);

const CloseButton = ({ className, isHidden, onClick }: ButtonProps) => (
  <ButtonContainer>
    <div
      onClick={onClick}
      className={classNames(
        "c-sports-modal__dismiss-button c-sports-modal__dismiss-button--close t-background-grey-dark-4 t-border-r--circle",
        className,
        isHidden && "c-sports-modal__dismiss-button--hidden"
      )}
    >
      <CrossIcon size="med" />
    </div>
  </ButtonContainer>
);

const FloatingCloseButton = ({ onClick }: ButtonProps) => (
  <div
    className="c-sports-modal__dismiss-button c-sports-modal__dismiss-button--floating t-color-grey-light-2 t-background-grey-dark-3 u-display--none@mobile"
    onClick={onClick}
  >
    <CrossIcon size="med" />
  </div>
);

const ButtonContainer = ({ children, className }: ButtonContainerProps) => (
  <Flex.Item
    className={classNames(
      "c-sports-modal__dismiss-button-container t-color-grey-light-2",
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
    <BackButton isHidden />
    <FloatingCloseButton onClick={onClose} />
    <Header>{children}</Header>
    <CloseButton className="u-visibility--hidden@tablet" onClick={onClose} />
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
    <CloseButton isHidden />
  </>
);

const WithoutDismissButtons = ({ children }: HeaderProps) => (
  <>
    <BackButton isHidden />
    <Header>{children}</Header>
    <CloseButton isHidden />
  </>
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
      className={`c-sports-modal__header--${dismissType} c-sports-modal__header t-background-grey-dark-3 t-color-white u-font-weight-bold u-padding--md u-text-align-center`}
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
