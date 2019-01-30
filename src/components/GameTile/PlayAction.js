// @flow
import React from "react";
import { PlayIcon } from "@casumo/cmp-icons";

type Props = {
  onLaunchGame: Function,
};

const PlayAction = ({ onLaunchGame }: Props) => (
  <div className="t-background-white t-color-grey-dark-3 t-border-r--circle u-padding--md">
    <PlayIcon size="med" onClick={() => onLaunchGame()} />
  </div>
);

export default PlayAction;
