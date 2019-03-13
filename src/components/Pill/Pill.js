/* @flow */
import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import { CrossIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

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
  /** Optional overrides for the default active classes (t-background-grey-light-1 t-color-grey-dark-2) */
  activeClassNames?: string,
  /** Optional overrides for the default inactive classes (t-background-grey-light-2 t-color-grey-dark-1) */
  inactiveClassNames?: string,
};

export const Pill = ({
  children,
  isActive,
  onClick,
  onRemove,
  activeClassNames = "t-background-grey-light-1 t-color-grey-dark-2",
  inactiveClassNames = "t-background-grey-light-2 t-color-grey-dark-1",
}: Props) => {
  const className = classNames(
    "c-pill t-border-r--pill u-font-weight-bold u-padding-horiz u-padding-vert--sm u-text-nowrap",
    isActive ? activeClassNames : inactiveClassNames
  );

  return (
    <Flex onClick={onClick} spacing="sm" className={className} align="center">
      <Flex.Block>
        <Text size="sm" tag="div" className="u-margin-horiz--sm">
          {children}
        </Text>
      </Flex.Block>

      {onRemove && (
        <CrossIcon
          className="t-color-grey-dark-1"
          onClick={event => {
            event.stopPropagation();
            onRemove();
          }}
        />
      )}
    </Flex>
  );
};
