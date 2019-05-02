// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { ArrowRightIcon } from "@casumo/cmp-icons";
import "./SportsScrollablePaginatedButton.scss";
import type { State, ClickHandlerType } from "Components/ScrollablePaginated";

type Props = {
  scrollableState: State,
  scrollableClickHandler: ClickHandlerType,
};

const SportsScrollablePaginatedButton = ({
  scrollableState,
  scrollableClickHandler,
}: Props) => {
  const showLeftButton = !scrollableState.isStartOfScroll;
  const showRightButton = !scrollableState.isEndOfScroll;

  return (
    <Flex
      justify="space-between"
      className="c-sports-nav-paginated__controls u-pointer-events-none"
      gap="none"
    >
      <div className="o-flex u-transform--flip-x">
        {showLeftButton && (
          <div className="o-flex-justify--center o-flex-align--center c-sports-nav-paginated__button">
            <div
              className="u-pointer-events-initial"
              onClick={e => scrollableClickHandler("left")}
            >
              <div className="u-padding--md u-cursor-pointer">
                <ArrowRightIcon className="t-color-grey-dark-3" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="o-flex">
        {showRightButton && (
          <div className="o-flex-justify--center o-flex-align--center c-sports-nav-paginated__button">
            <div
              className="u-pointer-events-initial"
              onClick={e => scrollableClickHandler("right")}
            >
              <div className="u-padding--md u-cursor-pointer">
                <ArrowRightIcon className="t-color-grey-dark-3" />
              </div>
            </div>
          </div>
        )}
      </div>
    </Flex>
  );
};

export default SportsScrollablePaginatedButton;

export const sportsPagerButtonRenderer = (
  scrollableState: State,
  scrollableClickHandler: ClickHandlerType
) => {
  const props = { scrollableState, scrollableClickHandler };

  return <SportsScrollablePaginatedButton {...props} />;
};
