/* @flow */
import React, { PureComponent } from "react";
import classNames from "classnames";
import type { Node } from "react";
import { CheckIcon } from "@casumo/cmp-icons";
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
      "u-padding t-border-r--circle t-color-grey-20",
      isFavourite && "t-background-purple-60",
      !isFavourite && "t-background-grey-0"
    );

    return isFavouritable ? (
      <Flex.Item
        data-test="favourite-list-item-indicator"
        className={tickClassName}
        style={{
          boxShadow: isFavourite ? "" : "inset 0px 0px 0px 2px #C9D6D6",
        }} // TODO(CPO): replace with scss class
      >
        <CheckIcon
          className={classNames(
            !isFavourite && "u-visibility--hidden t-color-grey-0",
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
