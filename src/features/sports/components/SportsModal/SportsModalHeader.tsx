import { ArrowLeftIcon, CloseIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import React from "react";
import classNames from "classnames";

import "./SportsModalHeader.scss";

type SharedProps = {
  children: React.ReactChild;
};

type HeaderProps = SharedProps & {
  className?: string;
  onBack?: Function;
  onClose?: Function;
};

type ButtonProps = {
  className?: string;
  onClick?: Function;
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
    className={classNames("text-grey-50", className)}
  >
    {children}
  </Flex.Item>
);

const BackButton = ({ onClick, className }: ButtonProps) => (
  <ButtonContainer onClick={onClick}>
    <Flex
      align="center"
      justify="center"
      data-test-id="sports-modal-back-button"
      className={classNames(
        "c-sports-modal-header__button c-sports-modal-header__button--back",
        className,
        onClick === noop && "u-visibility--hidden"
      )}
    >
      <ArrowLeftIcon size="md" />
    </Flex>
  </ButtonContainer>
);

const CloseButton = ({ onClick, className }: ButtonProps) => (
  <ButtonContainer onClick={onClick}>
    <Flex
      align="center"
      justify="center"
      data-test-id="sports-modal-close-button"
      className={classNames(
        "c-sports-modal-header__button c-sports-modal-header__button--close u-visibility--hidden@tablet",
        className,
        onClick === noop && "u-visibility--hidden"
      )}
    >
      <CloseIcon />
    </Flex>
  </ButtonContainer>
);

const FixedCloseButton = ({ onClick }: ButtonProps) => (
  <Flex
    align="center"
    justify="center"
    data-test-id="sports-modal-fixed-close-button"
    className={classNames(
      "c-sports-modal-header__fixed-button u-cursor--pointer t-border-r--sm u-width--4xlg u-height--4xlg text-grey-0 bg-grey-90 u-display--none@mobile u-display--none@phablet",
      onClick === noop && "u-visibility--hidden"
    )}
    onClick={onClick}
  >
    <CloseIcon />
  </Flex>
);

export const SportsModalHeader = ({
  children,
  onBack = noop,
  onClose = noop,
  className = "bg-white text-grey-90 t-border-bottom border-grey-5",
}: HeaderProps) => (
  <Flex
    align="center"
    justify="center"
    spacing="none"
    className={classNames(
      "c-sports-modal-header o-flex__item--no-shrink u-font-weight-bold u-padding--md u-text-align-center",
      className
    )}
  >
    <FixedCloseButton onClick={onClose} />
    <BackButton onClick={onBack} />
    <Flex.Block className="c-sports-modal-header__heading u-padding--lg@tablet u-padding--lg@desktop">
      {children}
    </Flex.Block>
    <CloseButton onClick={onClose} />
  </Flex>
);

export const components = {
  BackButton,
  CloseButton,
  FixedCloseButton,
};
