// @flow
import React, { type Node } from "react";
import classNames from "classnames";
import { CrossIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import { noop } from "Utils";
import "./CloseButton.scss";

type SharedProps = {
  children: Node,
};

type ButtonProps = {
  className?: string,
  onClick?: Function,
};

type ButtonContainerProps = ButtonProps & SharedProps;

const ButtonContainer = ({
  children,
  className,
  onClick,
}: ButtonContainerProps) => (
  <Flex.Item
    onClick={onClick}
    className={classNames(
      "t-color-grey-light-2 t-border-r--circle c-close-button__container",
      className
    )}
  >
    {children}
  </Flex.Item>
);

export const CloseButton = ({ className, onClick }: ButtonProps) => (
  <ButtonContainer onClick={onClick}>
    <Flex
      align="center"
      justify="center"
      className={classNames(
        "c-close-button t-background-grey-dark-4 t-border-r--circle",
        className,
        onClick === noop && "u-visibility--hidden"
      )}
    >
      <CrossIcon />
    </Flex>
  </ButtonContainer>
);
