// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import type { CellRendererParams } from "react-virtualized";
import ScrollablePaginated from "Components/ScrollablePaginated";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import type { ClickHandlerType } from "Components/ScrollablePaginated";

import "./ScrollableListPaginated.scss";

export type SeeMoreProps = {
  /** The text to render on the seeMore button. */
  text?: ?string,
  /** The link where to redirect once clicking the seeMore button. */
  url?: string,
  /** The seeMore text color */
  color?: string,
};

type Props = {
  /** The item height. */
  tileHeight: number,
  /** The item width. */
  tileWidth?: number,
  /** The style to apply to the list control buttons. */
  itemControlClass?: string,
  /** The text and url to render on the seeMore button. */
  seeMore?: SeeMoreProps,
  /** The list of items to be rendered. */
  itemCount: number,
  /** The list title */
  title: ?string,
  /** The item renderer. */
  itemRenderer: CellRendererParams => any,
};

export class ScrollableListPaginated extends React.PureComponent<Props> {
  buttonRenderer = (
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    scrollableClickHandler: ClickHandlerType
  ) => {
    const {
      itemControlClass = "c-scrollable-list-paginated__button",
    } = this.props;
    const itemGenericClass = `t-background-white t-border-r--pill o-flex o-flex-align--center o-flex-justify--center u-cursor-pointer
      c-scrollable-list-paginated__button u-pointer-events-initial`;
    const previousClickHandler = () => scrollableClickHandler("previous");
    const nextClickHandler = () => scrollableClickHandler("next");

    return (
      <Flex
        justify="space-between"
        align="center"
        className="c-scrollable-list-paginated__controls u-pointer-events-none"
      >
        <Flex.Item>
          {hasPreviousPage && (
            <div
              onClick={previousClickHandler}
              className={`${itemGenericClass} ${itemControlClass}--left`}
            >
              <DirectionRightIcon className="t-color-grey-90 Icons-c-icon--flip-horiz" />
            </div>
          )}
        </Flex.Item>
        <Flex.Item>
          {hasNextPage && (
            <div
              onClick={nextClickHandler}
              className={`${itemGenericClass} ${itemControlClass}--right`}
            >
              <DirectionRightIcon className="t-color-grey-90" />
            </div>
          )}
        </Flex.Item>
      </Flex>
    );
  };

  render() {
    const {
      itemCount,
      title,
      tileHeight,
      tileWidth,
      seeMore,
      itemRenderer,
    } = this.props;

    return (
      <div className="u-padding-top--xlg" data-test="scrollable-list-paginated">
        {title && <ScrollableListTitleRow title={title} seeMore={seeMore} />}
        <ScrollablePaginated
          className="c-scrollable-list-paginated"
          columnCount={itemCount}
          cellRenderer={itemRenderer}
          buttonRenderer={this.buttonRenderer}
          height={tileHeight}
          overlappingItemCount={0}
          defaultWidth={tileWidth}
        />
      </div>
    );
  }
}
