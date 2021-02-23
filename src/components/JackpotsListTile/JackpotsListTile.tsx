// @flow
import * as React from "react";
import * as A from "Types/apollo";
import { GameRow, GameRowText } from "Components/GameRow";

import "./JackpotsListTile.scss";

type Props = {
  games?: Array<A.GameRow_Game>,
};
// __FIX__ this should be the source of truth for the MustDrop and
// standard jackpot tiles.
export const JackpotsListTile = ({ games = [] }: Props) =>
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  games.map<React.Node>(game => (
    <div key={game.id} className="u-padding-bottom">
      <GameRow
        game={game}
        className="t-background-white u-padding--md t-border-r--md t-elevation--10"
        renderText={() => (
          <GameRowText name={game.name} description={game.gameStudio} />
        )}
      />
    </div>
  ));
