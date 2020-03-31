// @flow
import * as React from "react";
import classNames from "classnames";
import * as A from "Types/apollo";
import { GameRow, GameRowText } from "Components/GameRow";

import "./JackpotsListTile.scss";

type Props = {
  games?: Array<A.GameRow_Game>,
  isScrolling?: boolean,
};
// __FIX__ this should be the source of truth for the MustDrop and
// standard jackpot tiles.
export const JackpotsListTile = ({ games = [], isScrolling = false }: Props) =>
  games.map<React.Node>(game => (
    <div key={game.id} className="u-padding-y--sm">
      <GameRow
        game={game}
        className={classNames(
          "t-background-white u-padding--md t-border-r--md",
          {
            "t-box-shadow": !isScrolling,
          }
        )}
        renderText={() => <GameRowText name={game.name} />}
      />
    </div>
  ));
