// @flow
import * as React from "react";
import * as A from "Types/apollo";
import { GameRow } from "Components/GameRow/GameRow";
import { launchGame } from "Services/LaunchGameService";

import "./JackpotsListTile.scss";

type Props = {
  games?: Array<A.GameRow_Game>,
};
// __FIX__ this should be the source of truth for the MustDrop and
// standard jackpot tiles.
export const JackpotsListTile = ({ games = [] }: Props) =>
  games.map<React.Node>(game => (
    <div key={game.id} className="u-padding-y--sm">
      <GameRow
        game={game}
        className="t-background-white t-border-r--md t-box-shadow"
        onLaunchGame={() => launchGame({ slug: game.slug })}
      />
    </div>
  ));
