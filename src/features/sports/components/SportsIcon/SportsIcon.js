// @flow
import React from "react";

import "./SportsIcon.scss";

// TODO: get from CMS
const defaultActiveIndicator =
  "https://cms.casumo.com/wp-content/uploads/2019/01/football11.svg";

type Props = {
  src: { icon: string, activeIndicator?: string },
  isActive?: boolean,
};

const SportsIcon = ({ src, isActive }: Props) => (
  <div className="c-sports-icon">
    <img
      alt="sport icon"
      className="c-sports-icon__icon"
      data-test="sports-icon-icon"
      src={src.icon}
    />
    {isActive && (
      <img
        alt="sport is active"
        className={"c-sports-icon__active-indicator"}
        data-test="sports-icon-active-indicator"
        src={src.activeIndicator || defaultActiveIndicator}
      />
    )}
  </div>
);

export default SportsIcon;
