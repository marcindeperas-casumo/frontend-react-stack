/* @flow */
import React from "react";
import type { Node } from "react";
import classNames from "classnames";

import { CrossIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

export type Props = {
  children: Node,
  onClick?: () => void,
  onRemove?: () => void,
  isActive?: boolean,
  activeClassNames?: string,
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
    "t-border-r--pill u-font-weight-bold u-padding-horiz u-padding-vert--sm u-text-nowrap",
    isActive ? activeClassNames : inactiveClassNames
  );

  return (
    <Flex
      onClick={onClick}
      spacing="sm"
      className={className}
      align="center"
      style={{ borderWidth: 2, minHeight: 30, display: "inline-flex" }}
    >
      <Flex.Block>
        <Text size="sm" tag="div" className="u-margin-horiz--sm">
          {children}
        </Text>
      </Flex.Block>

      {onRemove && (
        <CrossIcon
          className="t-color-grey-dark-1 u-padding--none"
          onClick={event => {
            event.stopPropagation();
            onRemove();
          }}
        />
      )}
    </Flex>
  );
};
