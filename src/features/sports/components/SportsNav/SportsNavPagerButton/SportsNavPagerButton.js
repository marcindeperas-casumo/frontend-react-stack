// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { ArrowRightIcon } from "@casumo/cmp-icons";
import "./SportsNavPagerButton.scss";
import type { ClickHandlerType } from "Components/ScrollablePaginated";

type Props = {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  scrollableClickHandler: ClickHandlerType,
};

const SportsNavPagerButton = ({
  hasNextPage,
  hasPreviousPage,
  scrollableClickHandler,
}: Props) => (
  <Flex
    justify="space-between"
    className="c-sports-nav-paginated__controls u-pointer-events-none"
    gap="none"
  >
    <div className="o-flex u-transform--flip-x">
      {hasPreviousPage && (
        <div className="o-flex-justify--center o-flex-align--center c-sports-nav-paginated__button">
          <div
            className="u-pointer-events-initial"
            onClick={e => scrollableClickHandler("previous")}
          >
            <div className="u-padding--md u-cursor-pointer">
              <ArrowRightIcon className="t-color-grey-dark-3" />
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="o-flex">
      {hasNextPage && (
        <div className="o-flex-justify--center o-flex-align--center c-sports-nav-paginated__button">
          <div
            className="u-pointer-events-initial"
            onClick={e => scrollableClickHandler("next")}
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

export default SportsNavPagerButton;

export const sportsPagerButtonRenderer = (
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  scrollableClickHandler: ClickHandlerType
) => {
  const props = { hasNextPage, hasPreviousPage, scrollableClickHandler };

  return <SportsNavPagerButton {...props} />;
};
