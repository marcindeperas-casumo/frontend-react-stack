import React from "react";
import { PlayIcon } from "@casumo/cmp-icons";

const PlayAction = ({ launchGame }) => (
  <PlayIcon
    size="med"
    className="t-background-white t-color-grey-dark-3 t-border-r--circle u-padding--small"
    onClick={() => launchGame()}
  />
);

export default PlayAction;
