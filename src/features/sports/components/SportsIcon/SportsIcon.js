// @flow
import React from "react";
import classNames from "classnames";

import "./SportsIcon.scss";

type Props = {
  src: { icon: string, active: string },
  isActive?: boolean,
};

const SportsIcon = ({ src, isActive }: Props) => (
  <div className="c-sports-icon">
    <img
      data-test="sports-icon-icon"
      alt="sport icon"
      className="c-sports-icon__icon"
      src={src.icon}
    />
    {isActive && (
      <img
        data-test="sports-icon-active-indicator"
        alt="sport is active"
        src={src.active}
        className={"c-sports-icon__active-indicator"}
      />
    )}
  </div>
);

export default SportsIcon;
