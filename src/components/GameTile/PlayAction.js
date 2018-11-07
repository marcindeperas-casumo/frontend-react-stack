// @flow
import React from "react";
import { PlayIcon } from "@casumo/cmp-icons";

type Props = {
  onLaunchGame: Function,
};

const PlayAction = ({ onLaunchGame }: Props) => (
  <PlayIcon
    size="med"
    className="t-background-white t-color-grey-dark-3 t-border-r--circle u-padding--md"
    onClick={() => onLaunchGame()}
  />
);

export default PlayAction;
