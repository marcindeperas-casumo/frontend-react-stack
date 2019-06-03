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
  onBack?: () => void,
  onClose?: () => void,
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

const BackButton = ({ className, isHidden, onClick }: ButtonProps) => (
  <ButtonContainer>
    <div
      data-test="sports-modal-header-back-button"
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
      data-test="sports-modal-header-close-button"
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
    data-test="sports-modal-header-floating-close-button"
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

export const SportsModalHeader = ({
  children,
  onBack,
  onClose,
}: HeaderProps) => (
  <Flex
    align="center"
    justify="center"
    spacing="none"
    className="c-sports-modal__header t-background-grey-dark-3 t-color-white u-font-weight-bold u-padding--md u-text-align-center"
  >
    <FloatingCloseButton onClick={onClose} />
    <BackButton onBack={onBack} isHidden={Boolean(onBack)} />
    <Flex.Block>{children}</Flex.Block>
    <CloseButton onClick={onClose} isHidden={Boolean(onClose)} />
  </Flex>
);

export const components = {
  BackButton,
  CloseButton,
  FloatingCloseButton,
};
