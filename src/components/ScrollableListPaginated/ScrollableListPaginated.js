// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import type { CellRendererParams } from "react-virtualized";
import classNames from "classnames";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import type {
  spacerSizes,
  responsiveSpacerSizes,
} from "@casumo/cudl-react-prop-types";
import ScrollablePaginated from "Components/ScrollablePaginated";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import type { ClickHandlerType } from "Components/ScrollablePaginated";

import "./ScrollableListPaginated.scss";

type ListObject = {
  title?: string,
  itemIds: Array<Object>,
};

export type SeeMoreProps = {
  /** The text to render on the seeMore button. */
  text?: string,
  /** The link where to redirect once clicking the seeMore button. */
  url?: string,
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
  /** The list of items to be rendered. */
  list: ListObject,
  /** Apply margins to the scrollable items */
  itemSpacing?: spacerSizes | responsiveSpacerSizes,
  /** The item renderer. */
  itemRenderer: (i: number) => React.Node,
};

export class ScrollableListPaginated extends React.PureComponent<Props> {
  buttonRenderer = (
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    scrollableClickHandler: ClickHandlerType
  ) => {
    const { itemControlClass } = this.props;
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
    const { list, className, Component, itemSpacing = "default" } = this.props;
    const { itemIds } = list;
    const itemId = itemIds[columnIndex];
    const isNotFirstElement = columnIndex > 0;
    const elementClassNames = classNames(
      "u-height--full",
      isNotFirstElement && createModifierClasses("u-margin-left", itemSpacing)
    );

    return (
      <div style={style}>
        <div className={elementClassNames}>
          <div className={className}>
            {/* __FIX__ change "id" to "item" here */}
            <Component key={itemId} id={itemId} />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { list, tileHeight, seeMore } = this.props;
    const { title, itemIds } = list;

    return (
      <div className="u-padding-top--xlg" data-test="scrollable-list-paginated">
        {title && <ScrollableListTitleRow title={title} seeMore={seeMore} />}
        <ScrollablePaginated
          className="c-scrollable-list-paginated"
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
