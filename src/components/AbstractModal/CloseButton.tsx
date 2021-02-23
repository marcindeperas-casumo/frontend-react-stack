// @flow
import React from "react";
import classNames from "classnames";
import { CloseIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import "./CloseButton.scss";

type ButtonProps = {
  className?: string,
  onClick?: Function,
};

export const CloseButton = ({ className, onClick }: ButtonProps) => (
  <Flex
    align="center"
    justify="center"
    onClick={onClick}
    className={classNames(
      "c-close-button t-background-grey-0 t-border-r--circle",
      className
    )}
  >
    <CloseIcon />
  </Flex>
);
