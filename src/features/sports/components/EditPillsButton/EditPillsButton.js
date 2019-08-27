// @flow

import React from "react";
import type { Node } from "react";
import classNames from "classnames";
import { CrossIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

import "./EditPillsButton.scss";

type Props = {
  /** onClick handler for the edit button */
  onClick: () => void,
  /** className overrides to restyle the button */
  className?: string,
  /** optional label to show below the button */
  label?: Node,
};

export const defaultClasses = "t-color-white t-background-plum";

const EditPillsButton = ({
  onClick,
  label,
  className = defaultClasses,
}: Props) => (
  <Flex
    direction="vertical"
    align="center"
    className="u-cursor-pointer"
    onClick={onClick}
  >
    <Flex.Item
      className={classNames("c-edit-pills-button", className)}
      data-test="edit-pills-button-container"
    >
      <CrossIcon />
    </Flex.Item>
    {label && (
      <Flex.Item>
        <Text
          style={{ marginTop: 1 }}
          size="sm"
          className="u-font-weight-black u-text-align-center u-text-nowrap t-color-chrome u-margin-bottom--none"
        >
          {label}
        </Text>
      </Flex.Item>
    )}
  </Flex>
);

export default EditPillsButton;
