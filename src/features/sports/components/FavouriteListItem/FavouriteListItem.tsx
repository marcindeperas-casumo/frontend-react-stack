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
            <Flex align="center">
              <Text className="u-font-weight-bold u-margin--none" size="md">
                {this.props.label}
              </Text>
              {this.props.newLabel && (
                <div className="t-background-yellow-30
                t-border-r--sm t-color-purple-80
                c-sports-navigation-item--new u-padding--sm
                u-margin-left--lg u-font-weight-bold u-font-xs">
                    {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
                    <DictionaryTerm termKey="new">
                      {allLabel => (allLabel || 'NEW')}
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
