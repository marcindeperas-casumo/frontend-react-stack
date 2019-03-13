// @flow
import React from "react";

import Flex from "@casumo/cmp-flex";

import "./SportsIcon.scss";

type Props = {
  iconSrc: string,
  activeIndicatorSrc: string,
  isActive?: boolean,
};

const SportsIcon = ({ iconSrc, activeIndicatorSrc, isActive }: Props) => (
  <Flex.Item className="c-sports-icon">
    {isActive && (
      <img
        alt="sport is active"
        className="c-sports-icon__active-indicator u-position-absolute"
        data-test="sports-icon-active-indicator"
        src={activeIndicatorSrc}
      />
    )}
    <img
      alt="sport icon"
      className="c-sports-icon__icon"
      data-test="sports-icon-icon"
      src={iconSrc}
    />
  </Flex.Item>
);

export default SportsIcon;
