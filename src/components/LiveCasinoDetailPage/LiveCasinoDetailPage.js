// @flow
import React, { PureComponent } from "react";
import List from "@casumo/cmp-list";
import GameRow from "Components/GameRow/GameRow";
import SectionTitle from "./SectionTitle";
import type { GameId, GroupedGamesList } from "./types";

type Props = {
  /** grouped list of games to render */
  gamesList: GroupedGamesList,
  launchGame: GameId => void,
  /** used to decide if data needs to be fetched */
  isFetched: boolean,
  /** used to fetch page if isFetched === false */
  fetchPageBySlug: Function,
};

export default class LiveCasinoDetailPage extends PureComponent<Props> {
  componentDidMount() {
    if (!this.props.isFetched) this.props.fetchPageBySlug();
  }

  render() {
    return (
      <div className="u-padding-horiz--md u-padding-bottom--md">
        {this.props.gamesList.map(({ id, title, gamesInSection }) => (
          <React.Fragment key={id}>
            <SectionTitle title={title} />
            <List
              items={gamesInSection}
              render={game => (
                <GameRow
                  game={game}
                  onLaunchGame={() => this.props.launchGame(game.gameId)}
                />
              )}
            />
          </React.Fragment>
        ))}
      </div>
    );
  }
}
