// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";

import SumoAvatar from "./sumo-avatar.svg";

type Props = {
  beltLevel: number,
};

export const getClassModifier = (beltLevel: number) => {
  const beltLevelsAsColours = [
    "brown-light-2", // 0: rope
    "grey-light-1", // 1: white
    "yellow", // 2: yellow
    "red", // 3: red
    "blue", // 4: blue
    "purple", // 5: purple
    "black", // 6: black
    "black", // 7: sensei
  ];
  const className = beltLevelsAsColours[beltLevel] || beltLevelsAsColours[0];

  return `t-color-${className}`;
};

export default (props: Props) => {
  return (
    <div
      className={classNames(
        getClassModifier(props.beltLevel),
        `t-border-r--16 t-background-teal o-ratio`
      )}
    >
      <Flex align="center" justify="center" className="o-ratio__content">
        <SumoAvatar />
      </Flex>
    </div>
  );
};
