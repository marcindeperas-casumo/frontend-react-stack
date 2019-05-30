// @flow
import React from "react";
import type { Node } from "react";
import { cond, equals, T } from "ramda";
import { ArrowLeftIcon, CrossIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import { Modal } from "Components/Modal";
import { Desktop } from "Components/ResponsiveLayout";

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
  children?: Node,
};

const noop = () => {};

const Header = Flex.Block;

export const BackButton = ({ onClick }: ButtonProps) => (
  <ButtonContainer>
    <div
      onClick={onClick}
      className="c-sports-modal__dismiss-button c-sports-modal__dismiss-button--back"
    >
      <ArrowLeftIcon size="med" />
    </div>
  </ButtonContainer>
);

export const CloseButton = ({ onClick }: ButtonProps) => (
  <ButtonContainer>
    <div
      onClick={onClick}
      className="c-sports-modal__dismiss-button c-sports-modal__dismiss-button--close"
    >
      <CrossIcon size="med" />
    </div>
  </ButtonContainer>
);

export const FloatingCloseButton = ({ onClick }: ButtonProps) => (
  <div className="c-sports-modal__dismiss-button c-sports-modal__dismiss-button--floating">
    <CrossIcon size="med" />
  </div>
);

export const ButtonContainer = ({ children }: ButtonContainerProps) => (
  <Flex.Item className="c-sports-modal__dismiss-button-container">
    {children}
  </Flex.Item>
);

export const WithCloseButton = ({
  children,
  onClose = noop,
  onBack = noop,
}: HeaderProps) => (
  <>
    <FloatingCloseButton onClick={onClose} />
    {/* this should be for tablet++ not just desktop, maybe solve with classNames instead? */}
    <Desktop>
      <ButtonContainer />
    </Desktop>
    <Header>{children}</Header>
    <ButtonContainer>
      <CloseButton onClick={onClose} />
    </ButtonContainer>
  </>
);

export const WithBackButton = ({
  children,
  onClose = noop,
  onBack = noop,
}: HeaderProps) => (
  <>
    <FloatingCloseButton onClick={onClose} />
    <ButtonContainer>
      <BackButton onClick={onBack} />
    </ButtonContainer>
    <Header>{children}</Header>
    <ButtonContainer />
  </>
);

export const WithoutDismissButtons = ({ children }: HeaderProps) => (
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
    <Modal.Header className="c-sports-modal__header u-padding">
      <HeaderVariant {...passthroughProps} />
    </Modal.Header>
  );
};
