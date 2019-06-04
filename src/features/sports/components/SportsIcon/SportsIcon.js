// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import "./SportsIcon.scss";

export type Props = {
  alt: string,
  iconSrc: string,
  activeIndicatorSrc: string,
  isActive?: boolean,
};

const SportsIcon = ({ alt, iconSrc, activeIndicatorSrc, isActive }: Props) => (
  <div className="o-ratio c-sports-icon">
    {isActive && (
      <img
        alt={alt}
        className="o-ratio__content"
        data-test="sports-icon-active-indicator"
        src={activeIndicatorSrc}
        width={48}
      />
    )}
    <Flex justify="center" align="center" className="o-ratio__content">
      <img
        alt="sport icon"
        data-test="sports-icon-icon"
        src={iconSrc}
        width={32}
      />
    </Flex>
  </div>
);

export default SportsIcon;
