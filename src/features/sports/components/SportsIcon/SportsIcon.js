// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import DangerousHtml from "Components/DangerousHtml";
import "./SportsIcon.scss";

export type Props = {
  alt: string,
  iconSrc: string,
  activeIndicator: string,
  isActive?: boolean,
};

const SportsIcon = ({ alt, iconSrc, activeIndicator, isActive }: Props) => (
  <div className="o-ratio c-sports-icon">
    {isActive && (
      <div
        className="o-ratio__content c-sports-icon__active-indicator"
        data-test="sports-icon-active-indicator"
      >
        <DangerousHtml html={activeIndicator} element="div" />
      </div>
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
