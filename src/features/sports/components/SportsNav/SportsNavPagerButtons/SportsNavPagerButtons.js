// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { ArrowRightIcon } from "@casumo/cmp-icons";
import type { ClickHandlerType } from "Components/ScrollablePaginated";
import "./SportsNavPagerButtons.scss";

type PagerButtonProps = {
  shouldRender: boolean,
  onClick: any => void,
};

const PagerButton = ({ shouldRender, onClick }: PagerButtonProps) =>
  shouldRender && (
    <div className="o-flex-justify--center o-flex-align--center c-sports-nav-paginated__button">
      <div className="u-pointer-events-initial" onClick={onClick}>
        <div className="u-padding--md u-cursor-pointer">
          <ArrowRightIcon className="t-color-grey-dark-3" size="md" />
        </div>
      </div>
    </div>
  );

type SportsNavPagerButtonsProps = {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  scrollableClickHandler: ClickHandlerType,
};

export const SportsNavPagerButtons = ({
  hasNextPage,
  hasPreviousPage,
  scrollableClickHandler,
}: SportsNavPagerButtonsProps) => (
  <Flex
    justify="space-between"
    className="c-sports-nav-paginated__controls u-pointer-events-none"
    gap="none"
  >
    <div className="o-flex u-transform--flip-x">
      <PagerButton
        shouldRender={hasPreviousPage}
        onClick={() => scrollableClickHandler("previous")}
      />
    </div>
    <div className="o-flex">
      <PagerButton
        shouldRender={hasNextPage}
        onClick={() => scrollableClickHandler("next")}
      />
    </div>
  </Flex>
);

export const sportsPagerButtonRenderer = (
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  scrollableClickHandler: ClickHandlerType
) => {
  const props = { hasNextPage, hasPreviousPage, scrollableClickHandler };

  return <SportsNavPagerButtons {...props} />;
};
