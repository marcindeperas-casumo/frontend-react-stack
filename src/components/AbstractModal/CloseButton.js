// @flow
import React from "react";
import classNames from "classnames";
import { CrossIcon } from "@casumo/cmp-icons";
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
      "c-close-button t-background-grey-light-2 t-border-r--circle",
      className
    )}
  >
    <CrossIcon />
  </Flex>
);
