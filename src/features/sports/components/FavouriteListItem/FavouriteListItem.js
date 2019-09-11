/* @flow */
import React, { PureComponent } from "react";
import classNames from "classnames";
import type { Node } from "react";
import { TickIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

export type Props = {
  /** The text label for this list item */
  label: string,
  /** The Node to use as the list item icon */
  icon?: Node,
  /** Is the list item favourited? */
  isFavourite?: boolean,
  /** Should the list item be favouritable, false values disable toggle */
  isFavouritable?: boolean,
  /** Callback for when the list item is clicked */
  onClick?: () => *,
};

export default class FavouriteListItem extends PureComponent<Props> {
  get icon(): ?Node {
    return this.props.icon && <Flex.Item>{this.props.icon}</Flex.Item>;
  }

  get favouriteIcon(): ?Node {
    const { isFavouritable = true, isFavourite } = this.props;

    const tickClassName = classNames(
      "u-padding t-border-r--circle t-color-chrome",
      isFavourite && "t-background-plum",
      !isFavourite && "t-background-chrome-light-2"
    );

    return isFavouritable ? (
      <Flex.Item
        data-test="favourite-list-item-indicator"
        className={tickClassName}
        style={{
          boxShadow: isFavourite ? "" : "inset 0px 0px 0px 2px #C9D6D6",
        }} // TODO(CPO): replace with scss class
      >
        <TickIcon
          className={classNames(
            !isFavourite && "u-hidden t-color-chrome-light-2",
            "t-color-white"
          )}
        />
      </Flex.Item>
    ) : null;
  }

  render() {
    return (
      <Flex.Item onClick={this.props.onClick}>
        <Flex align="center">
          {this.icon}
          <Flex.Block>
            <Text className="u-font-weight-bold u-margin--none" size="md">
              {this.props.label}
            </Text>
          </Flex.Block>
          {this.favouriteIcon}
        </Flex>
      </Flex.Item>
    );
  }
}
