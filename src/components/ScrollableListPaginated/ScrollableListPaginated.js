// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import type { CellRendererParams } from "react-virtualized";
import ScrollableListTitle from "Components/ScrollableListTitle";
import ScrollablePaginated from "Components/ScrollablePaginated";
import type { ClickHandlerType } from "Components/ScrollablePaginated";

import "./ScrollableListPaginated.scss";

type ListObject = {
  title: string,
  itemIds: Array<string>,
};

type SeeMoreProps = {
  /** The link where to redirect once clicking the seeMore button. */
  text: string,
  /** The text to render on the seeMore button. */
  url: string,
  /** The seeMore text color */
  color?: string,
};

type Props = {
  /** The item height. */
  tileHeight: number,
  /** The style to apply to the list items. */
  className: string,
  /** The style to apply to the list control buttons. */
  itemControlClass: string,
  /** The text and url to render on the seeMore button. */
  seeMore?: SeeMoreProps,
  /** The item renderer. */
  Component: Function,
  /** The list of items to be rendered. */
  list: ListObject,
};

export class ScrollableListPaginated extends React.PureComponent<Props> {
  buttonRenderer = (
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    scrollableClickHandler: ClickHandlerType
  ) => {
    const { itemControlClass } = this.props;
    const itemGenericClass = `t-background-white t-border-r--pill o-flex o-flex-align--center o-flex-justify--center u-cursor-pointer
      c-game-list-horizontal-desktop-paginated__button`;
    const previousClickHandler = () => scrollableClickHandler("previous");
    const nextClickHandler = () => scrollableClickHandler("next");

    return (
      <Flex
        justify="space-between"
        align="center"
        className=" c-game-list-horizontal-desktop-paginated__controls"
      >
        <Flex.Item>
          {hasPreviousPage && (
            <div
              onClick={previousClickHandler}
              className={`${itemGenericClass} ${itemControlClass}--left`}
            >
              <DirectionRightIcon className="t-color-grey-dark-3 Icons-c-icon--flip-horiz" />
            </div>
          )}
        </Flex.Item>
        <Flex.Item>
          {hasNextPage && (
            <div
              onClick={nextClickHandler}
              className={`${itemGenericClass} ${itemControlClass}--right`}
            >
              <DirectionRightIcon className="t-color-grey-dark-3" />
            </div>
          )}
        </Flex.Item>
      </Flex>
    );
  };

  cellRenderer = ({ columnIndex, style }: CellRendererParams) => {
    const { list, className, Component } = this.props;
    const { itemIds } = list;
    const itemId = itemIds[columnIndex];

    return (
      <div style={style}>
        <div className="u-padding-right">
          <div className={className}>
            <Component key={itemId} id={itemId} />
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { list, tileHeight, seeMore } = this.props;
    const { title, itemIds } = list;
    const seeMoreFontColor = seeMore.color || "t-color-blue";

    return (
      <div className="u-padding-top--xlg">
        <Flex justify="space-between">
          <Flex.Item>
            <ScrollableListTitle title={title} />
          </Flex.Item>
          {seeMore.url && (
            <Flex.Item className="u-padding-right--md">
              <a href={seeMore.url}>
                <Text size="xs" tag="h3" className={seeMoreFontColor}>
                  {seeMore.text}
                </Text>
              </a>
            </Flex.Item>
          )}
        </Flex>
        <ScrollablePaginated
          className="c-game-list-horizontal-desktop-paginated"
          columnCount={itemIds.length}
          cellRenderer={this.cellRenderer}
          buttonRenderer={this.buttonRenderer}
          height={tileHeight}
          overlappingItemCount={0}
        />
      </div>
    );
  }
}
