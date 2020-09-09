// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import "./SportsIcon.scss";

export type Props = {
  alt: string,
  iconSrc: string,
  activeIndicator: string,
  isActive?: boolean,
};

const SportsIcon = ({ iconSrc }: Props) => (
  <div className="o-ratio c-sports-icon">
    <Flex justify="center" align="center" className="o-ratio__content">
      <img
        alt="sport icon"
        data-test="sports-icon-icon"
        src={iconSrc}
        width={22}
      />
    </Flex>
  </div>
);

export default SportsIcon;
