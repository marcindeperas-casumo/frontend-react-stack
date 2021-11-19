import { CloseIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import React from "react";
import classNames from "classnames";
import "./CloseButton.scss";
//@ts-ignore
import ClosePng from "./Close.png";

type ButtonProps = {
  className?: string;
  onClick?: Function;
  modifyCloseButton?: boolean;
};

export const CloseButton = ({
  className,
  onClick,
  modifyCloseButton,
}: ButtonProps) => {
  if (modifyCloseButton) {
    return (
      <div className="c-campaign-top-card-close-button">
        <img
          //@ts-ignore
          onClick={onClick}
          src={ClosePng}
          className="u-padding--2xlg u-cursor--pointer"
        />
      </div>
    );
  }
  return (
    <Flex
      align="center"
      justify="center"
      onClick={onClick}
      className={classNames(
        "c-close-button bg-grey-0 t-border-r--circle",
        className
      )}
    >
      <CloseIcon />
    </Flex>
  );
};
