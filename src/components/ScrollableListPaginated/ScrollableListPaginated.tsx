import Flex from "@casumo/cmp-flex";
import { ArrowRightIcon, ArrowLeftIcon } from "@casumo/cmp-icons";
import type { CellRendererParams } from "react-virtualized";
import * as React from "react";
import ScrollablePaginated from "Components/ScrollablePaginated";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"../ScrollablePaginated"' has no exported ... Remove this comment to see the full error message
import type { ClickHandlerType } from "Components/ScrollablePaginated";

import "./ScrollableListPaginated.scss";

export type SeeMoreProps = {
  /** The text to render on the seeMore button. */
  text: string;
  /** The link where to redirect once clicking the seeMore button. */
  url: string;
  /** Optional onClick handler for seeMore link */
  onClick?: () => void;
};

type Props = {
  /** The item height. */
  tileHeight: number;
  /** The item width. */
  tileWidth?: number;
  /** The style to apply to the list control buttons. */
  itemControlClass?: string;
  /** The text and url to render on the seeMore button. */
  seeMore?: SeeMoreProps;
  /** The list of items to be rendered. */
  itemCount: number;
  /** The list title */
  title: string | undefined;
  /** The item renderer. */
  itemRenderer: (cellRendererParams: CellRendererParams) => any;
  /** styles ClassNames */
};

export class ScrollableListPaginated extends React.PureComponent<Props> {
  buttonRenderer = (
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    scrollableClickHandler: ClickHandlerType
  ) => {
    const { itemControlClass = "c-scrollable-list-paginated__button" } =
      this.props;
    const itemGenericClass = `bg-white t-border-r--pill o-flex o-flex-align--center o-flex-justify--center u-cursor--pointer
      c-scrollable-list-paginated__button u-pointer--initial`;
    const previousClickHandler = () => scrollableClickHandler("previous");
    const nextClickHandler = () => scrollableClickHandler("next");

    return (
      <Flex
        justify="space-between"
        align="center"
        className="c-scrollable-list-paginated__controls u-pointer--none"
      >
        <Flex.Item className="u-padding-left--xlg u-padding-left--none@desktop">
          {hasPreviousPage && (
            <div
              onClick={previousClickHandler}
              className={`${itemGenericClass} ${itemControlClass}--left`}
            >
              <ArrowLeftIcon className="text-grey-90" />
            </div>
          )}
        </Flex.Item>
        <Flex.Item className="u-padding-right--xlg u-padding-right--none@desktop">
          {hasNextPage && (
            <div
              onClick={nextClickHandler}
              className={`${itemGenericClass} ${itemControlClass}--right`}
            >
              <ArrowRightIcon className="text-grey-90" />
            </div>
          )}
        </Flex.Item>
      </Flex>
    );
  };

  render() {
    const { itemCount, title, tileHeight, tileWidth, seeMore, itemRenderer } =
      this.props;

    return (
      <div data-test={`scrollable-list-paginated `}>
        {title && <ScrollableListTitleRow title={title} seeMore={seeMore} />}
        <ScrollablePaginated
          className={`c-scrollable-list-paginated`}
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
