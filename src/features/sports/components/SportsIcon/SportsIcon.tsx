// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import "./SportsIcon.scss";

export type Props = {
  alt: string,
  iconSrc: string,
  activeIndicator: string,
  isActive?: boolean,
  width?: number,
};

const SportsIcon = ({ iconSrc, width = 32 }: Props) => (
  <div className="o-ratio c-sports-icon">
    <Flex justify="center" align="center" className="o-ratio__content">
      <img
        alt="sport icon"
        data-test="sports-icon-icon"
        src={iconSrc}
        width={width}
      />
    </Flex>
  </div>
);

export default SportsIcon;
