/* @flow */
import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import { CloseIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import "./Pill.scss";

export type Props = {
  /** The content to be displayed in the Pill */
  children: Node,
  /** Optional onClick handler for the Pill, if not supplied no onclick will hooked up */
  onClick?: () => void,
  /** Optional onRemove handler for the Pill, if supplied Pill will have cross icon and call this when the cross is clicked */
  onRemove?: () => void,
  /** Whether the Pill is active and therefore uses it's active styles, default is false */
  isActive?: boolean,
  /** Optional overrides for the default active classes (t-background-grey-20 t-color-grey-70) */
  activeClassNames?: string,
  /** Optional overrides for the default inactive classes (t-background-grey-0 t-color-grey-50) */
  inactiveClassNames?: string,
};

export const Pill = ({
  children,
  isActive,
  onClick,
  onRemove,
  activeClassNames = "t-background-grey-20 t-color-grey-70",
  inactiveClassNames = "t-background-grey-0 t-color-grey-50",
}: Props) => {
  const className = classNames(
    "c-pill t-border-r--pill u-font-weight-bold u-padding-x u-padding-y--sm u-cursor-pointer",
    isActive ? activeClassNames : inactiveClassNames
  );

  return (
    <Flex
      onClick={onClick}
      className={className}
      align="center"
      justify="center"
    >
      <div className="u-padding--sm">
        <div className="u-text-nowrap o-flex-align--center u-line-height--1 u-font-sm">
          {children}
        </div>
      </div>

      {onRemove && (
        <CloseIcon
          size="sm"
          onClick={event => {
            event.stopPropagation();
            onRemove();
          }}
        />
      )}
    </Flex>
  );
};
