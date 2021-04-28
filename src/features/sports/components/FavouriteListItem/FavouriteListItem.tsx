import { CheckIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import React, { PureComponent } from "react";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";

export type Props = {
  /** The text label for this list item */
  label: string;
  /** The Node to use as the list item icon */
  icon?: React.ReactNode;
  /** Is the list item favourited? */
  isFavourite?: boolean;
  /** Should the list item be favouritable, false values disable toggle */
  isFavouritable?: boolean;
  /** Should the list item be marked as NEW */
  newLabel?: boolean;
  /** Callback for when the list item is clicked */
  onClick?: () => any;
};

export default class FavouriteListItem extends PureComponent<Props> {
  get icon(): React.ReactNode {
    return this.props.icon && <Flex.Item>{this.props.icon}</Flex.Item>;
  }

  get favouriteIcon(): React.ReactNode {
    const { isFavouritable = true, isFavourite } = this.props;

    const tickClassName = classNames(
      "u-padding t-border-r--circle text-grey-20",
      isFavourite && "bg-purple-60",
      !isFavourite && "bg-grey-0"
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
            !isFavourite && "u-visibility--hidden text-grey-0",
            "text-white"
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
            <Flex align="center">
              <Text className="u-font-weight-bold u-margin--none" size="md">
                {this.props.label}
              </Text>
              {this.props.newLabel && (
                <div
                  className={classNames(
                    "bg-yellow-30 t-border-r--sm",
                    "text-purple-80 c-sports-navigation-item--new",
                    "u-padding--sm u-margin-left--lg u-font-weight-bold",
                    "u-font-xs"
                  )}
                >
                  <DictionaryTerm termKey="new">
                    {allLabel => <>{allLabel || "NEW"}</>}
                  </DictionaryTerm>
                </div>
              )}
            </Flex>
          </Flex.Block>
          {this.favouriteIcon}
        </Flex>
      </Flex.Item>
    );
  }
}
