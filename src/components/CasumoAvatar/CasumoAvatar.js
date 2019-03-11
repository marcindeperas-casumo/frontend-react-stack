// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";

import SumoAvatar from "./sumo-avatar.svg";

type Props = {
  belt: string,
};

export default (props: Props) => {
  return (
    <div
      className={classNames(
        `t-color-${props.belt}`,
        "t-border-r--16 t-background-teal o-ratio"
      )}
    >
      <Flex align="center" justify="center" className="o-ratio__content">
        <SumoAvatar />
      </Flex>
    </div>
  );
};
