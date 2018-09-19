import React from "react";

import { PlayerIcon } from "@casumo/cmp-icons";

const LiveCasinoPlayers = ({ players }) => (
  <div className="o-flex-align--center">
    <PlayerIcon className="u-margin-vert t-color-grey" size="sml" />
    <span className="u-margin-left--micro u-margin-vert u-font-weight-bold t-color-grey-dark-2">
      {players}
    </span>
  </div>
);

export default LiveCasinoPlayers;
